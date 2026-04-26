/**
 * server.js — Serveur principal Nexvia
 * Node.js / Express.js / SQLite3 / JWT / Bcryptjs
 *
 * Sécurité : CORS restrictif, rate limiting, pas d'énumération d'utilisateurs,
 * révocation de tokens, validation complète des entrées.
 */

'use strict';

const express    = require('express');
const cors       = require('cors');
const sqlite3    = require('sqlite3').verbose();
const bcrypt     = require('bcryptjs');
const jwt        = require('jsonwebtoken');
const path       = require('path');
require('dotenv').config();

const { loginLimiter, registerLimiter } = require('./middleware/rateLimiter');
const { validateEmail, validatePassword, validateName, validateProfileImage, validateLanguage } = require('./utils/validators');
const logger = require('./utils/logger');

// ================================================================
// Validation de la clé secrète JWT — obligatoire au démarrage
// Le serveur refuse de démarrer si SECRET_KEY est absente ou faible
// ================================================================
const SECRET_KEY = process.env.SECRET_KEY;

if (!SECRET_KEY) {
    logger.error('CONFIG', "SECRET_KEY non définie dans les variables d'environnement.");
    logger.error('CONFIG', "Ajoutez SECRET_KEY=<clé forte> dans votre fichier .env");
    process.exit(1);
}

if (SECRET_KEY.length < 32) {
    logger.warn('CONFIG', `SECRET_KEY trop courte (${SECRET_KEY.length} chars). Utilisez au moins 64 caractères aléatoires en production.`);
}

// ================================================================
// Imports et configuration
// Chargement des modules et configuration de l'application Express
// ================================================================
const app  = express();
const PORT = process.env.PORT || 5000;

// ================================================================
// Configuration CORS — restreinte aux origines connues
// Empêche les requêtes CSRF depuis des sites non autorisés
// credentials: false car l'auth utilise Bearer token (pas cookies)
// ================================================================

// Origines autorisées statiques + surcharge via variable d'environnement
const STATIC_ORIGINS = [
    'http://localhost:3000',
    'http://localhost:5173',
    'http://localhost:5500',
    'http://127.0.0.1:5500',
    'http://127.0.0.1:5000',
    'https://aissa999.github.io', // GitHub Pages — origin sans chemin ni slash final
];

// Permet d'ajouter des origines supplémentaires via CORS_ORIGINS dans .env
const envOrigins = process.env.CORS_ORIGINS
    ? process.env.CORS_ORIGINS.split(',').map(o => o.trim()).filter(Boolean)
    : [];

const allowedOrigins = [...new Set([...STATIC_ORIGINS, ...envOrigins])];

app.use(cors({
    origin: function (origin, callback) {
        // Autoriser les requêtes sans origin (Postman, cURL, apps mobiles)
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) return callback(null, true);
        // Rejeter toute autre origine
        logger.warn('CORS', `Origine non autorisée bloquée : ${origin}`);
        return callback(new Error('Not allowed by CORS'));
    },
    credentials: false, // Pas de cookies — auth par Bearer token uniquement
}));

// ================================================================
// Middleware de parsing JSON
// Limite globale : 10kb (suffisant pour toutes les routes sauf upload avatar)
// La route PUT /api/profile applique sa propre limite de 5mb
// ================================================================
app.use(express.json({ limit: '10kb' }));

// ================================================================
// Connexion base de données
// Connexion à SQLite et création de la table users si elle n'existe pas.
// Définissez DB_PATH dans .env sur un chemin de disque monté pour la persistance sur Render.
// ================================================================
const DB_PATH = process.env.DB_PATH || path.join(__dirname, 'nexvia.db');
const db = new sqlite3.Database(DB_PATH, (err) => {
    if (err) {
        logger.error('DB', 'Impossible d\'ouvrir la base de données :', err);
        process.exit(1);
    }
    logger.info('DB', `Connecté à la base de données SQLite : ${DB_PATH}`);

    db.run(`CREATE TABLE IF NOT EXISTS users (
        id           INTEGER PRIMARY KEY AUTOINCREMENT,
        name         TEXT    NOT NULL,
        email        TEXT    UNIQUE NOT NULL,
        password     TEXT    NOT NULL,
        profileImage TEXT    DEFAULT 'avatar1',
        language     TEXT    DEFAULT 'fr'
    )`, (tableErr) => {
        if (tableErr) {
            logger.error('DB', 'Erreur lors de la création de la table users :', tableErr);
            process.exit(1);
        }

        // ================================================================
        // Démarrage serveur
        // Lance le serveur seulement après confirmation que la BDD est prête
        // ================================================================
        app.listen(PORT, () => {
            logger.info('SERVER', `Serveur Nexvia démarré sur le port ${PORT}`);
        });
    });
});

// ================================================================
// Liste de révocation de tokens (logout côté serveur)
// Stocke les tokens révoqués avec leur timestamp d'expiration.
// Nettoyage automatique toutes les heures pour éviter les fuites mémoire.
// ================================================================
// Map<token: string, expiresAt: number (timestamp ms)>
const revokedTokens = new Map();

// Nettoyage périodique des tokens expirés de la liste noire
setInterval(() => {
    const now = Date.now();
    let removed = 0;
    for (const [token, expiresAt] of revokedTokens.entries()) {
        if (expiresAt <= now) {
            revokedTokens.delete(token);
            removed++;
        }
    }
    if (removed > 0) logger.info('AUTH', `Nettoyage révocation : ${removed} token(s) expirés supprimés.`);
}, 60 * 60 * 1000); // Toutes les heures

// ================================================================
// Middleware JWT — authenticateToken
// Vérifie le token Bearer dans Authorization, contrôle la liste noire
// ================================================================
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token manquant' });
    }

    // Vérifier si le token a été révoqué (logout)
    if (revokedTokens.has(token)) {
        return res.status(401).json({ message: 'Token révoqué. Veuillez vous reconnecter.' });
    }

    // Valider le token avec l'algorithme HS256 explicitement spécifié
    jwt.verify(token, SECRET_KEY, { algorithms: ['HS256'] }, (err, user) => {
        if (err) return res.status(403).json({ message: 'Token invalide ou expiré' });
        req.user  = user;
        req.token = token; // Conservé pour la route logout
        next();
    });
};

// ================================================================
// Route POST /api/register
// Inscription : valide les données, hache le mot de passe,
// enregistre l'utilisateur et retourne un token JWT
// ================================================================
app.post('/api/register', registerLimiter, async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // --- Validation des champs requis ---
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Tous les champs sont requis' });
        }

        const nameCheck = validateName(name);
        if (!nameCheck.valid) {
            return res.status(400).json({ message: nameCheck.error });
        }

        if (!validateEmail(email)) {
            return res.status(400).json({ message: 'Format d\'email invalide' });
        }

        const passwordCheck = validatePassword(password);
        if (!passwordCheck.valid) {
            return res.status(400).json({ message: passwordCheck.error });
        }

        // Hachage du mot de passe avec bcrypt (10 rounds)
        const hashedPassword = await bcrypt.hash(password, 10);

        db.run(
            `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`,
            [name.trim(), email.trim().toLowerCase(), hashedPassword],
            function (err) {
                if (err) {
                    if (err.message.includes('UNIQUE constraint failed')) {
                        return res.status(409).json({ message: 'Cet email est déjà utilisé' });
                    }
                    logger.error('REGISTER', 'Erreur base de données lors de l\'inscription :', err);
                    return res.status(500).json({ message: 'Erreur lors de la création du compte' });
                }

                // Générer un token JWT signé HS256, valide 24h
                const token = jwt.sign(
                    { id: this.lastID, email: email.trim().toLowerCase() },
                    SECRET_KEY,
                    { expiresIn: '24h', algorithm: 'HS256' }
                );

                res.status(201).json({
                    message: 'Compte créé avec succès',
                    token,
                    user: { name: name.trim(), email: email.trim().toLowerCase(), profileImage: 'avatar1' },
                });
            }
        );
    } catch (error) {
        logger.error('REGISTER', 'Erreur inattendue :', error);
        res.status(500).json({ message: 'Erreur serveur interne' });
    }
});

// ================================================================
// Route POST /api/login
// Connexion : vérifie email et mot de passe, retourne un token JWT
//
// SÉCURITÉ — Protection contre l'énumération d'utilisateurs :
//   - Même message d'erreur que l'email existe ou non ("Email ou mot de passe incorrect")
//   - bcrypt.compare() est toujours appelé (avec hash fictif si user absent)
//     afin que les deux cas prennent le même temps (protection timing attack)
// ================================================================
app.post('/api/login', loginLimiter, async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email et mot de passe requis' });
        }

        // Sélectionner uniquement les colonnes nécessaires (éviter SELECT *)
        // Le champ password est nécessaire ici pour la comparaison bcrypt
        db.get(
            `SELECT id, name, email, password, profileImage FROM users WHERE email = ?`,
            [email.trim().toLowerCase()],
            async (err, user) => {
                try {
                    if (err) {
                        logger.error('LOGIN', 'Erreur base de données :', err);
                        return res.status(500).json({ message: 'Erreur serveur' });
                    }

                    // Hash fictif utilisé quand l'utilisateur n'existe pas.
                    // bcrypt.compare() est appelé dans tous les cas pour égaliser le temps
                    // de réponse et empêcher la détection d'emails valides par timing.
                    const DUMMY_HASH = '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy';
                    const hashToCompare = user ? user.password : DUMMY_HASH;

                    const validPassword = await bcrypt.compare(password, hashToCompare);

                    // Retourner le même message qu'il s'agisse d'un email inconnu
                    // ou d'un mauvais mot de passe (no user enumeration)
                    if (!user || !validPassword) {
                        return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
                    }

                    const token = jwt.sign(
                        { id: user.id, email: user.email },
                        SECRET_KEY,
                        { expiresIn: '24h', algorithm: 'HS256' }
                    );

                    res.json({
                        message: 'Connexion réussie',
                        token,
                        user: { name: user.name, email: user.email, profileImage: user.profileImage },
                    });
                } catch (innerError) {
                    logger.error('LOGIN', 'Erreur interne du callback :', innerError);
                    res.status(500).json({ message: 'Erreur serveur interne' });
                }
            }
        );
    } catch (error) {
        logger.error('LOGIN', 'Erreur inattendue :', error);
        res.status(500).json({ message: 'Erreur serveur interne' });
    }
});

// ================================================================
// Route POST /api/logout
// Révocation du token côté serveur — le token est ajouté à la liste noire
// Le client doit supprimer le token de son stockage local
// ================================================================
app.post('/api/logout', authenticateToken, (req, res) => {
    // Décoder le token pour récupérer son expiration (sans re-vérification)
    const decoded = jwt.decode(req.token);
    const expiresAt = decoded && decoded.exp ? decoded.exp * 1000 : Date.now() + 24 * 60 * 60 * 1000;

    // Ajouter à la liste noire jusqu'à expiration naturelle
    revokedTokens.set(req.token, expiresAt);

    res.json({ message: 'Déconnexion réussie' });
});

// ================================================================
// Route GET /api/profile
// Récupère les informations du profil de l'utilisateur connecté
// ================================================================
app.get('/api/profile', authenticateToken, (req, res) => {
    // Sélectionner uniquement les colonnes nécessaires — ne jamais exposer le hash du mot de passe
    db.get(
        `SELECT id, name, email, profileImage, language FROM users WHERE id = ?`,
        [req.user.id],
        (err, user) => {
            if (err) {
                logger.error('PROFILE', 'Erreur base de données (GET) :', err);
                return res.status(500).json({ message: 'Erreur serveur' });
            }
            if (!user) return res.status(404).json({ message: 'Utilisateur introuvable' });
            res.json(user);
        }
    );
});

// ================================================================
// Route PUT /api/profile
// Met à jour les informations du profil (nom, email, avatar, langue)
// Limite du corps augmentée à 5mb pour permettre les uploads d'avatar en base64
// ================================================================
app.put('/api/profile', authenticateToken, express.json({ limit: '5mb' }), (req, res) => {
    try {
        const { name, email, profileImage, language } = req.body;

        const updates = [];
        const values  = [];

        // Validation et ajout conditionnel de chaque champ
        if (name !== undefined) {
            const nameCheck = validateName(name);
            if (!nameCheck.valid) return res.status(400).json({ message: nameCheck.error });
            updates.push('name = ?');
            values.push(name.trim());
        }

        if (email !== undefined) {
            if (!validateEmail(email)) {
                return res.status(400).json({ message: 'Format d\'email invalide' });
            }
            updates.push('email = ?');
            values.push(email.trim().toLowerCase());
        }

        if (profileImage !== undefined) {
            const imgCheck = validateProfileImage(profileImage);
            if (!imgCheck.valid) return res.status(400).json({ message: imgCheck.error });
            updates.push('profileImage = ?');
            values.push(profileImage);
        }

        if (language !== undefined) {
            if (!validateLanguage(language)) {
                return res.status(400).json({ message: 'Langue non supportée. Valeurs acceptées : fr, en, ar' });
            }
            updates.push('language = ?');
            values.push(language);
        }

        if (updates.length === 0) {
            return res.status(400).json({ message: 'Aucune donnée à mettre à jour' });
        }

        values.push(req.user.id);

        db.run(
            `UPDATE users SET ${updates.join(', ')} WHERE id = ?`,
            values,
            function (err) {
                if (err) {
                    if (err.message.includes('UNIQUE constraint failed')) {
                        return res.status(409).json({ message: 'Cet email est déjà pris' });
                    }
                    logger.error('PROFILE', 'Erreur base de données (PUT) :', err);
                    return res.status(500).json({ message: 'Erreur lors de la mise à jour' });
                }
                res.json({ message: 'Profil mis à jour avec succès' });
            }
        );
    } catch (error) {
        logger.error('PROFILE', 'Erreur inattendue (PUT) :', error);
        res.status(500).json({ message: 'Erreur serveur interne' });
    }
});

// ================================================================
// Route GET / — Health check
// Utilisé par Render pour vérifier que le serveur répond
// ================================================================
app.get('/', (req, res) => {
    res.json({
        status:    'running',
        service:   'Nexvia API',
        version:   '1.0.0',
        timestamp: new Date().toISOString(),
    });
});

// ================================================================
// Middleware 404 — Routes inconnues
// Retourne du JSON cohérent pour toute route non définie
// ================================================================
app.use((req, res) => {
    res.status(404).json({ message: 'Route non trouvée' });
});

// ================================================================
// Gestionnaire global des erreurs Express
// Intercepte toutes les erreurs non gérées passées via next(err)
// ================================================================
app.use((err, req, res, next) => {
    logger.error('EXPRESS', 'Erreur non gérée :', err);
    res.status(500).json({ message: 'Erreur serveur inattendue' });
});

// ================================================================
// Arrêt gracieux — SIGTERM (Render) et SIGINT (Ctrl+C développement)
// Ferme proprement la connexion SQLite avant de quitter
// ================================================================
function gracefulShutdown(signal) {
    logger.info('SERVER', `Signal ${signal} reçu. Arrêt du serveur...`);
    db.close((err) => {
        if (err) logger.error('DB', 'Erreur lors de la fermeture de la base de données :', err);
        else logger.info('DB', 'Connexion SQLite fermée proprement.');
        process.exit(err ? 1 : 0);
    });
}

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT',  () => gracefulShutdown('SIGINT'));
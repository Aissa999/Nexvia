const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
require('dotenv').config();

// ================================================================
// Imports et configuration
// Chargement des modules et configuration de l'application Express
// ================================================================
const app = express();

app.use(cors({
    origin: true,
    credentials: true
}));

app.use(express.json({ limit: '5mb' }));

const PORT = process.env.PORT || 5000;
const SECRET_KEY = process.env.SECRET_KEY || 'nexvia_super_secret_key';

// ================================================================
// Connexion base de données
// Connexion à SQLite et création de la table users si elle n'existe pas
// ================================================================
// Définissez DB_PATH sur un chemin de disque monté si vous voulez de la persistance.
const DB_PATH = process.env.DB_PATH || path.join(__dirname, 'nexvia.db');
const db = new sqlite3.Database(DB_PATH, (err) => {
    if (err) {
        console.error('Erreur ouverture base de données:', err.message);
        process.exit(1); // crash fast if DB can't open
    }
    console.log('Connecté à la base de données SQLite.');

    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        profileImage TEXT DEFAULT 'avatar1',
        language TEXT DEFAULT 'fr'
    )`, (tableErr) => {
        if (tableErr) {
            console.error('Erreur création table:', tableErr.message);
            process.exit(1);
        }

        // ================================================================
        // Démarrage serveur
        // Lance le serveur seulement après confirmation que la base de données est prête
        // ================================================================
        app.listen(PORT, () => {
            console.log(`Serveur Nexvia démarré sur le port ${PORT}`);
        });
    });
});

// ================================================================
// Middleware JWT
// Vérifie le token JWT dans l'en-tête Authorization avant d'accéder aux routes protégées
// ================================================================
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ message: 'Token manquant' });

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ message: 'Token invalide' });
        req.user = user;
        next();
    });
};

// ================================================================
// Route POST /api/register
// Inscription: valide les données, hache le mot de passe, enregistre l'utilisateur et retourne un token
// ================================================================
app.post('/api/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Tous les champs sont requis' });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Format d\'email invalide' });
        }

        if (password.length < 8) {
            return res.status(400).json({ message: 'Le mot de passe doit contenir au moins 8 caractères' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        db.run(`INSERT INTO users (name, email, password) VALUES (?, ?, ?)`, [name, email, hashedPassword], function (err) {
            if (err) {
                if (err.message.includes('UNIQUE constraint failed')) {
                    return res.status(409).json({ message: 'Cet email est déjà utilisé' });
                }
                console.error('Database error during register:', err);
                return res.status(500).json({ message: 'Erreur lors de la création du compte' });
            }

            // Create a token for immediate login
            const token = jwt.sign({ id: this.lastID, email }, SECRET_KEY, { expiresIn: '7d' });
            res.status(201).json({ message: 'Compte créé avec succès', token, user: { name, email, profileImage: 'avatar1' } });
        });
    } catch (error) {
        console.error('Register error:', error);
        res.status(500).json({ message: 'Erreur serveur interne' });
    }
});

// ================================================================
// Route POST /api/login
// Connexion: vérifie email et mot de passe, retourne un token JWT si valide
// ================================================================
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email et mot de passe requis' });
        }

        db.get(`SELECT * FROM users WHERE email = ?`, [email], async (err, user) => {
            try {
                if (err) {
                    console.error('Database error during login:', err);
                    return res.status(500).json({ message: 'Erreur serveur' });
                }
                if (!user) return res.status(404).json({ message: 'Utilisateur introuvable' });

                const validPassword = await bcrypt.compare(password, user.password);
                if (!validPassword) return res.status(401).json({ message: 'Mot de passe incorrect' });

                const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '7d' });

                res.json({ message: 'Connexion réussie', token, user: { name: user.name, email: user.email, profileImage: user.profileImage } });
            } catch (innerError) {
                console.error('Inner login error:', innerError);
                res.status(500).json({ message: 'Erreur serveur interne' });
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Erreur serveur interne' });
    }
});

// ================================================================
// Route GET /api/profile
// Récupère les informations du profil de l'utilisateur connecté
// ================================================================
app.get('/api/profile', authenticateToken, (req, res) => {
    db.get(`SELECT id, name, email, profileImage, language FROM users WHERE id = ?`, [req.user.id], (err, user) => {
        if (err) {
            console.error('Database error during get profile:', err);
            return res.status(500).json({ message: 'Erreur serveur' });
        }
        if (!user) return res.status(404).json({ message: 'Utilisateur introuvable' });
        res.json(user);
    });
});

// ================================================================
// Route PUT /api/profile
// Met à jour les informations du profil (nom, email, avatar, langue)
// ================================================================
app.put('/api/profile', authenticateToken, (req, res) => {
    try {
        const { name, email, profileImage, language } = req.body;

        const updates = [];
        const values = [];

        if (name) { updates.push('name = ?'); values.push(name); }
        if (email) { updates.push('email = ?'); values.push(email); }
        if (profileImage) { updates.push('profileImage = ?'); values.push(profileImage); }
        if (language) { updates.push('language = ?'); values.push(language); }

        if (updates.length === 0) return res.status(400).json({ message: 'Aucune donnée à mettre à jour' });

        values.push(req.user.id);

        db.run(`UPDATE users SET ${updates.join(', ')} WHERE id = ?`, values, function (err) {
            if (err) {
                if (err.message.includes('UNIQUE constraint failed')) {
                    return res.status(409).json({ message: 'Cet email est déjà pris' });
                }
                console.error('Database error during update profile:', err);
                return res.status(500).json({ message: 'Erreur lors de la mise à jour' });
            }
            res.json({ message: 'Profil mis à jour avec succès' });
        });
    } catch (error) {
        console.error('Update profile error:', error);
        res.status(500).json({ message: 'Erreur serveur interne' });
    }
});

// ================================================================
// Route GET /
// Route de vérification que le serveur fonctionne (health check pour Render)
// ================================================================
app.get("/", (req, res) => {
    res.send("Nexvia backend is running 🚀");
});

// ================================================================
// Gestionnaire erreurs global
// Intercepte toutes les erreurs Express non gérées
// ================================================================
app.use((err, req, res, next) => {
    console.error('Erreur non gérée:', err.stack);
    res.status(500).json({ message: 'Erreur serveur inattendue' });
});

process.on('SIGTERM', () => {
    console.log('Arrêt du serveur...');
    db.close(() => process.exit(0));
});
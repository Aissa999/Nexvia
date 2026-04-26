/**
 * middleware/rateLimiter.js — Limiteurs de débit pour les routes sensibles
 * Protège contre les attaques brute-force et le spam d'inscription.
 * Utilise le store mémoire (compatible avec Render sans configuration supplémentaire).
 */

const rateLimit = require('express-rate-limit');

// ================================================================
// Limiteur de connexion
// Max 5 tentatives par IP toutes les 15 minutes
// ================================================================
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5,
    // Réponse JSON standardisée (pas HTML)
    message: {
        message: 'Trop de tentatives de connexion. Veuillez réessayer dans 15 minutes.'
    },
    standardHeaders: true,  // Inclut RateLimit-* headers dans la réponse
    legacyHeaders: false,    // Désactive les headers X-RateLimit-*
    // Personnalise le gestionnaire pour retourner du JSON
    handler: (req, res, next, options) => {
        res.status(options.statusCode).json(options.message);
    },
    // Saute le rate limiting si la requête vient du serveur lui-même (ex: tests internes)
    skip: (req) => req.ip === '127.0.0.1' && process.env.NODE_ENV === 'test',
});

// ================================================================
// Limiteur d'inscription
// Max 3 inscriptions par IP par heure — évite le spam de comptes
// ================================================================
const registerLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 heure
    max: 3,
    message: {
        message: "Trop de tentatives d'inscription. Veuillez réessayer dans 1 heure."
    },
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res, next, options) => {
        res.status(options.statusCode).json(options.message);
    },
    skip: (req) => req.ip === '127.0.0.1' && process.env.NODE_ENV === 'test',
});

module.exports = { loginLimiter, registerLimiter };

/**
 * utils/validators.js — Fonctions de validation des données d'entrée
 * Centralise toutes les règles de validation pour éviter la duplication.
 */

// Avatars prédéfinis acceptés (doit correspondre aux fichiers dans /images/)
const ALLOWED_AVATARS = ['avatar1', 'avatar2', 'avatar3', 'avatar4', 'avatar5', 'avatar6'];

// Langues acceptées par l'application
const ALLOWED_LANGUAGES = ['fr', 'en', 'ar'];

/**
 * Valide le format d'un email.
 * @param {string} email
 * @returns {boolean}
 */
function validateEmail(email) {
    if (typeof email !== 'string') return false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim()) && email.length <= 254;
}

/**
 * Valide un mot de passe selon les règles de sécurité.
 * Note: bcryptjs tronque silencieusement à 72 caractères — imposer max 128.
 * @param {string} password
 * @returns {{ valid: boolean, error?: string }}
 */
function validatePassword(password) {
    if (typeof password !== 'string') {
        return { valid: false, error: 'Le mot de passe doit être une chaîne de caractères' };
    }
    if (password.length < 8) {
        return { valid: false, error: 'Le mot de passe doit contenir au moins 8 caractères' };
    }
    if (password.length > 128) {
        return { valid: false, error: 'Le mot de passe ne peut pas dépasser 128 caractères' };
    }
    return { valid: true };
}

/**
 * Valide un nom d'utilisateur.
 * @param {string} name
 * @returns {{ valid: boolean, error?: string }}
 */
function validateName(name) {
    if (typeof name !== 'string') {
        return { valid: false, error: 'Le nom doit être une chaîne de caractères' };
    }
    const trimmed = name.trim();
    if (trimmed.length < 1) {
        return { valid: false, error: 'Le nom ne peut pas être vide' };
    }
    if (trimmed.length > 100) {
        return { valid: false, error: 'Le nom ne peut pas dépasser 100 caractères' };
    }
    return { valid: true };
}

/**
 * Valide une valeur de profileImage.
 * Valeurs acceptées :
 *   - Clé d'avatar prédéfinie (ex: "avatar1")
 *   - URL HTTP/HTTPS valide (max 255 chars)
 *   - Data URL base64 d'image (pour les uploads depuis le frontend)
 * @param {string} image
 * @returns {{ valid: boolean, error?: string }}
 */
function validateProfileImage(image) {
    if (typeof image !== 'string') {
        return { valid: false, error: "La valeur de l'avatar est invalide" };
    }

    // Clé prédéfinie
    if (ALLOWED_AVATARS.includes(image)) {
        return { valid: true };
    }

    // Data URL base64 d'image (envoyée depuis le FileReader du frontend)
    if (image.startsWith('data:image/')) {
        // On laisse la limite de taille être gérée par express.json({ limit: '5mb' })
        return { valid: true };
    }

    // URL HTTP/HTTPS
    if ((image.startsWith('http://') || image.startsWith('https://')) && image.length <= 255) {
        return { valid: true };
    }

    return {
        valid: false,
        error: "L'avatar doit être un avatar prédéfini, une URL valide ou une image base64",
    };
}

/**
 * Valide un code de langue.
 * @param {string} lang
 * @returns {boolean}
 */
function validateLanguage(lang) {
    return typeof lang === 'string' && ALLOWED_LANGUAGES.includes(lang);
}

module.exports = {
    validateEmail,
    validatePassword,
    validateName,
    validateProfileImage,
    validateLanguage,
    ALLOWED_AVATARS,
    ALLOWED_LANGUAGES,
};

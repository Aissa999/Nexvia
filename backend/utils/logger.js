/**
 * utils/logger.js — Utilitaire de journalisation simple
 * Remplace les console.log/error bruts par un logger structuré avec horodatage.
 */

const isProd = process.env.NODE_ENV === 'production';

/**
 * Formate et affiche un message de log.
 * @param {'INFO'|'WARN'|'ERROR'} level - Niveau du log
 * @param {string} component - Nom du composant (ex: 'AUTH', 'DB')
 * @param {string} message - Message descriptif
 * @param {*} [extra] - Données supplémentaires (erreur, objet, etc.)
 */
function log(level, component, message, extra) {
    const timestamp = new Date().toISOString();
    const prefix = `[${timestamp}] [${level}] [${component}]`;

    if (level === 'ERROR') {
        // En production: ne pas exposer les stack traces dans les logs
        if (isProd && extra instanceof Error) {
            console.error(`${prefix} ${message}:`, extra.message);
        } else {
            console.error(`${prefix} ${message}`, extra !== undefined ? extra : '');
        }
    } else if (level === 'WARN') {
        console.warn(`${prefix} ${message}`, extra !== undefined ? extra : '');
    } else {
        console.log(`${prefix} ${message}`, extra !== undefined ? extra : '');
    }
}

const logger = {
    /**
     * Log d'information général.
     * @param {string} component
     * @param {string} message
     */
    info:  (component, message)        => log('INFO',  component, message),

    /**
     * Log d'avertissement (configuration faible, valeur manquante, etc.).
     * @param {string} component
     * @param {string} message
     */
    warn:  (component, message)        => log('WARN',  component, message),

    /**
     * Log d'erreur avec erreur optionnelle.
     * @param {string} component
     * @param {string} message
     * @param {Error|*} [error]
     */
    error: (component, message, error) => log('ERROR', component, message, error),
};

module.exports = logger;

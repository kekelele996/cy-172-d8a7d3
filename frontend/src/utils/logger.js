const LEVELS = ['debug', 'info', 'warn', 'error'];

const noop = () => { };

function createLogger(scope = 'app') {
    return {
        debug: (message, extra) => console.debug(`[${scope}] ${message}`, extra ?? ''),
        info: (message, extra) => console.info(`[${scope}] ${message}`, extra ?? ''),
        warn: (message, extra) => console.warn(`[${scope}] ${message}`, extra ?? ''),
        error: (message, extra) => console.error(`[${scope}] ${message}`, extra ?? '')
    };
}

function createSilentLogger() {
    return LEVELS.reduce((acc, level) => {
        acc[level] = noop;
        return acc;
    }, {});
}

function shouldMute() {
    return typeof window !== 'undefined' && window.__SILENT_LOG__ === true;
}

export const logger = shouldMute() ? createSilentLogger() : createLogger('toolbox');

export function scopedLogger(scope) {
    return shouldMute() ? createSilentLogger() : createLogger(scope);
}

export default logger;

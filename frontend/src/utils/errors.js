import { ERROR_MESSAGES, formatMessage } from '../constants/errors.js';
import { scopedLogger } from './logger.js';

const log = scopedLogger('errors');

export class ToolboxError extends Error {
    constructor(code, params) {
        const template = ERROR_MESSAGES[code] ?? ERROR_MESSAGES.UNEXPECTED;
        super(formatMessage(template, params));
        this.name = 'ToolboxError';
        this.code = code;
    }
}

export function isToolboxError(err) {
    return err instanceof ToolboxError;
}

export function safeExecute(fn, fallback = null) {
    try {
        return fn();
    } catch (err) {
        if (isToolboxError(err)) {
            log.warn(err.message);
        } else {
            log.error('未预期错误', err);
        }
        return fallback;
    }
}

export function toUserMessage(err) {
    if (isToolboxError(err)) return err.message;
    log.error('未预期错误', err);
    return ERROR_MESSAGES.UNEXPECTED;
}

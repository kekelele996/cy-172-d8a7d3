import { CHAR_SETS, PASSWORD_LENGTH } from '../constants/index.js';
import { ToolboxError } from './errors.js';
import { scopedLogger } from './logger.js';

const log = scopedLogger('passwordGenerator');

function randomInteger(maxExclusive) {
    if (maxExclusive <= 0) return 0;
    if (typeof crypto !== 'undefined' && typeof crypto.getRandomValues === 'function') {
        const buffer = new Uint32Array(1);
        crypto.getRandomValues(buffer);
        return buffer[0] % maxExclusive;
    }
    return Math.floor(Math.random() * maxExclusive);
}

function collectPool(selectedCharSets) {
    return selectedCharSets
        .map((key) => CHAR_SETS[key])
        .filter(Boolean)
        .join('');
}

export function generatePassword({ length = PASSWORD_LENGTH.DEFAULT, charTypes = ['lowercase', 'uppercase', 'digits', 'symbols'] } = {}) {
    if (!Number.isFinite(length) || length < PASSWORD_LENGTH.MIN || length > PASSWORD_LENGTH.MAX) {
        throw new ToolboxError('INVALID_LENGTH', { min: PASSWORD_LENGTH.MIN, max: PASSWORD_LENGTH.MAX });
    }
    if (!Array.isArray(charTypes) || charTypes.length === 0) {
        throw new ToolboxError('NO_CHAR_SET_SELECTED');
    }

    const pool = collectPool(charTypes);
    if (!pool) {
        throw new ToolboxError('NO_CHAR_SET_SELECTED');
    }

    let password = '';
    for (let i = 0; i < length; i += 1) {
        password += pool[randomInteger(pool.length)];
    }

    log.info('生成密码成功', { length, charTypes: charTypes.join(',') });
    return password;
}

export default generatePassword;

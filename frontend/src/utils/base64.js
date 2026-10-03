import { ToolboxError } from './errors.js';
import { scopedLogger } from './logger.js';

const log = scopedLogger('base64');

function toBase64(text) {
    const bytes = new TextEncoder().encode(text);
    let binary = '';
    bytes.forEach((b) => {
        binary += String.fromCharCode(b);
    });
    return btoa(binary);
}

function fromBase64(encoded) {
    const normalized = encoded.replace(/\s+/g, '');
    const binary = atob(normalized);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i += 1) {
        bytes[i] = binary.charCodeAt(i);
    }
    return new TextDecoder().decode(bytes);
}

export function encodeBase64(text) {
    if (text === null || text === undefined || text === '') {
        throw new ToolboxError('EMPTY_INPUT');
    }
    try {
        const result = toBase64(text);
        log.info('Base64 编码成功');
        return result;
    } catch (err) {
        throw new ToolboxError('BASE64_ENCODE_FAILED');
    }
}

export function decodeBase64(encoded) {
    if (encoded === null || encoded === undefined || encoded === '') {
        throw new ToolboxError('EMPTY_INPUT');
    }
    try {
        const result = fromBase64(encoded);
        log.info('Base64 解码成功');
        return result;
    } catch (err) {
        throw new ToolboxError('BASE64_DECODE_FAILED');
    }
}

export default { encodeBase64, decodeBase64 };

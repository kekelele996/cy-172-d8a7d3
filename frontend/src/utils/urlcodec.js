import { ToolboxError } from './errors.js';
import { scopedLogger } from './logger.js';

const log = scopedLogger('urlcodec');

export function encodeURL(text) {
    if (text === null || text === undefined || text === '') {
        throw new ToolboxError('EMPTY_INPUT');
    }
    try {
        const result = encodeURIComponent(text);
        log.info('URL 编码成功');
        return result;
    } catch (err) {
        throw new ToolboxError('URL_ENCODE_FAILED');
    }
}

export function decodeURL(encoded) {
    if (encoded === null || encoded === undefined || encoded === '') {
        throw new ToolboxError('EMPTY_INPUT');
    }
    try {
        const result = decodeURIComponent(encoded);
        log.info('URL 解码成功');
        return result;
    } catch (err) {
        throw new ToolboxError('URL_DECODE_FAILED');
    }
}

export default { encodeURL, decodeURL };

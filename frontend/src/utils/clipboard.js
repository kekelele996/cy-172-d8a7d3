import { ToolboxError } from './errors.js';
import { scopedLogger } from './logger.js';

const log = scopedLogger('clipboard');

export async function copyToClipboard(text) {
    if (text === null || text === undefined) {
        throw new ToolboxError('EMPTY_INPUT');
    }
    if (typeof navigator !== 'undefined' && navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
        try {
            await navigator.clipboard.writeText(text);
            log.info('已复制到剪贴板');
            return;
        } catch (err) {
            log.warn('navigator.clipboard 失败，回退到 execCommand');
        }
    }

    try {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'fixed';
        textarea.style.left = '-9999px';
        document.body.appendChild(textarea);
        textarea.select();
        const ok = document.execCommand('copy');
        document.body.removeChild(textarea);
        if (!ok) throw new Error('execCommand failed');
        log.info('已复制到剪贴板（回退方案）');
    } catch (err) {
        throw new ToolboxError('COPY_FAILED');
    }
}

export default copyToClipboard;

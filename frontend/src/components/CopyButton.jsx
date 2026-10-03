import React, { useState } from 'react';
import { COPY_FEEDBACK_MS } from '../constants/index.js';
import copyToClipboard from '../utils/clipboard.js';
import { toUserMessage } from '../utils/errors.js';
import { scopedLogger } from '../utils/logger.js';

const log = scopedLogger('CopyButton');

function CopyButton({ text, label = '复制' }) {
    const [feedback, setFeedback] = useState('');

    async function handleCopy() {
        if (!text) {
            setFeedback('暂无可复制内容');
            return;
        }
        try {
            await copyToClipboard(text);
            setFeedback('已复制');
        } catch (err) {
            log.warn('复制失败', err);
            setFeedback(toUserMessage(err));
        }
        window.setTimeout(() => setFeedback(''), COPY_FEEDBACK_MS);
    }

    return (
        <span className="copy-wrapper">
            <button type="button" className="copy-button" onClick={handleCopy}>
                {label}
            </button>
            {feedback ? <span className="copy-feedback">{feedback}</span> : null}
        </span>
    );
}

export default CopyButton;

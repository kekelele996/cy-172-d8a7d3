import React, { useState } from 'react';
import PageHeader from '../components/PageHeader.jsx';
import CopyButton from '../components/CopyButton.jsx';
import { encodeBase64, decodeBase64 } from '../utils/base64.js';
import { toUserMessage } from '../utils/errors.js';
import { scopedLogger } from '../utils/logger.js';

const log = scopedLogger('Base64Page');

function Base64Page() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [error, setError] = useState('');

    function handleEncode() {
        try {
            const result = encodeBase64(input);
            setOutput(result);
            setError('');
        } catch (err) {
            log.warn('Base64 编码失败', err);
            setOutput('');
            setError(toUserMessage(err));
        }
    }

    function handleDecode() {
        try {
            const result = decodeBase64(input);
            setOutput(result);
            setError('');
        } catch (err) {
            log.warn('Base64 解码失败', err);
            setOutput('');
            setError(toUserMessage(err));
        }
    }

    function handleClear() {
        setInput('');
        setOutput('');
        setError('');
    }

    return (
        <section className="tool-page">
            <PageHeader
                icon="📦"
                title="Base64 编解码"
                description="在文本与 Base64 之间相互转换，编码与解码均在本地完成。"
            />

            <div className="form-card">
                <label className="form-row">
                    <span className="form-label">输入内容</span>
                    <textarea
                        className="result-textarea"
                        rows={5}
                        value={input}
                        placeholder="输入要编码或解码的文本…"
                        onChange={(e) => setInput(e.target.value)}
                    />
                </label>

                <div className="action-row">
                    <button type="button" className="primary-button" onClick={handleEncode}>
                        编码
                    </button>
                    <button type="button" className="secondary-button" onClick={handleDecode}>
                        解码
                    </button>
                    <button type="button" className="ghost-button" onClick={handleClear}>
                        清空
                    </button>
                    <CopyButton text={output} label="复制结果" />
                </div>

                {error ? <div className="error-message">{error}</div> : null}

                <div className="result-row">
                    <label className="form-label">结果</label>
                    <textarea
                        className="result-textarea"
                        readOnly
                        rows={5}
                        value={output}
                        placeholder="结果将显示在这里…"
                    />
                </div>
            </div>
        </section>
    );
}

export default Base64Page;

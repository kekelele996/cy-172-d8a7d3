import React, { useState } from 'react';
import PageHeader from '../components/PageHeader.jsx';
import CopyButton from '../components/CopyButton.jsx';
import { encodeURL, decodeURL } from '../utils/urlcodec.js';
import { toUserMessage } from '../utils/errors.js';
import { scopedLogger } from '../utils/logger.js';

const log = scopedLogger('URLPage');

function URLPage() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [error, setError] = useState('');

    function handleEncode() {
        try {
            const result = encodeURL(input);
            setOutput(result);
            setError('');
        } catch (err) {
            log.warn('URL 编码失败', err);
            setOutput('');
            setError(toUserMessage(err));
        }
    }

    function handleDecode() {
        try {
            const result = decodeURL(input);
            setOutput(result);
            setError('');
        } catch (err) {
            log.warn('URL 解码失败', err);
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
                icon="🔗"
                title="URL 编解码"
                description="对 URL 文本进行 encode / decode 转换，所有处理均在本地浏览器中完成。"
            />

            <div className="form-card">
                <label className="form-row">
                    <span className="form-label">输入内容</span>
                    <textarea
                        className="result-textarea"
                        rows={5}
                        value={input}
                        placeholder="输入要编码或解码的 URL 文本…"
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

export default URLPage;

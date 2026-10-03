import React, { useState } from 'react';
import PageHeader from '../components/PageHeader.jsx';
import CopyButton from '../components/CopyButton.jsx';
import { CHAR_SET_LABELS, PASSWORD_LENGTH } from '../constants/index.js';
import generatePassword from '../utils/passwordGenerator.js';
import { toUserMessage } from '../utils/errors.js';
import { scopedLogger } from '../utils/logger.js';

const log = scopedLogger('GeneratorPage');

function GeneratorPage() {
  const [length, setLength] = useState(PASSWORD_LENGTH.DEFAULT);
  const [charTypes, setCharTypes] = useState({
    lowercase: true,
    uppercase: true,
    digits: true,
    symbols: false
  });
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function toggleCharType(key) {
    setCharTypes((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  function handleGenerate() {
    const selected = Object.keys(charTypes).filter((key) => charTypes[key]);
    try {
      const next = generatePassword({ length, charTypes: selected });
      setPassword(next);
      setError('');
    } catch (err) {
      log.warn('生成失败', err);
      setPassword('');
      setError(toUserMessage(err));
    }
  }

  return (
    <section className="tool-page">
      <PageHeader
        icon="🔐"
        title="随机密码生成器"
        description="自定义长度与字符类型，一键生成并复制到剪贴板。"
      />

      <div className="form-card">
        <label className="form-row">
          <span className="form-label">密码长度</span>
          <div className="length-control">
            <input
              type="range"
              min={PASSWORD_LENGTH.MIN}
              max={PASSWORD_LENGTH.MAX}
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
            />
            <input
              type="number"
              className="length-number"
              min={PASSWORD_LENGTH.MIN}
              max={PASSWORD_LENGTH.MAX}
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
            />
          </div>
        </label>

        <div className="form-row">
          <span className="form-label">字符类型</span>
          <div className="checkbox-group">
            {Object.keys(CHAR_SET_LABELS).map((key) => (
              <label key={key} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={charTypes[key]}
                  onChange={() => toggleCharType(key)}
                />
                <span>{CHAR_SET_LABELS[key]}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="action-row">
          <button type="button" className="primary-button" onClick={handleGenerate}>
            生成密码
          </button>
          <CopyButton text={password} label="复制密码" />
        </div>

        {error ? <div className="error-message">{error}</div> : null}

        <div className="result-row">
          <label className="form-label">生成结果</label>
          <textarea
            className="result-textarea"
            readOnly
            rows={3}
            value={password}
            placeholder="点击「生成密码」按钮后，结果将显示在此处。"
          />
        </div>
      </div>
    </section>
  );
}

export default GeneratorPage;

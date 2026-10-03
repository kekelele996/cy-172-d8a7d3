import React, { useMemo, useState } from 'react';
import PageHeader from '../components/PageHeader.jsx';
import { STRENGTH_LEVELS } from '../constants/index.js';
import analyzePassword from '../utils/passwordStrength.js';

function StrengthPage() {
    const [password, setPassword] = useState('');

    const analysis = useMemo(() => analyzePassword(password), [password]);

    const total = STRENGTH_LEVELS.length - 1;
    const progress = (analysis.score / total) * 100;

    return (
        <section className="tool-page">
            <PageHeader
                icon="🛡️"
                title="密码强度检测器"
                description="实时评估强度等级，基于字符多样性与长度估算破解时间。"
            />

            <div className="form-card">
                <label className="form-row">
                    <span className="form-label">输入密码</span>
                    <input
                        type="password"
                        className="text-input"
                        autoComplete="off"
                        spellCheck={false}
                        placeholder="输入要检测的密码…"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>

                <div className="strength-display">
                    <div className="strength-meta">
                        <div className="strength-badge" style={{ background: analysis.level.color }}>
                            {analysis.level.label}
                        </div>
                        <div className="strength-extra">
                            <div>熵值：{analysis.entropy.toFixed(2)} bits</div>
                            <div>预估破解时间：{analysis.crackTimeText}</div>
                        </div>
                    </div>
                    <div className="strength-bar">
                        <div
                            className="strength-bar-fill"
                            style={{ width: `${progress}%`, background: analysis.level.color }}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default StrengthPage;

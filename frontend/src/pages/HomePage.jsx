import React from 'react';
import { HOME_ENTRIES } from '../constants/index.js';

function HomePage({ onNavigate }) {
    return (
        <section className="home-page">
            <div className="home-hero">
                <h1>安全场景 · 密码工具箱</h1>
                <p className="home-subtitle">
                    四个常用的本地安全工具，所有计算全部在浏览器本地完成，不会将任何数据上传到服务器。
                </p>
            </div>
            <div className="home-grid">
                {HOME_ENTRIES.map((entry) => (
                    <button
                        type="button"
                        key={entry.key}
                        className="tool-card"
                        onClick={() => onNavigate(entry.key)}
                    >
                        <div className="tool-card-icon">{entry.icon}</div>
                        <div className="tool-card-title">{entry.title}</div>
                        <div className="tool-card-desc">{entry.desc}</div>
                        <div className="tool-card-action">开始使用 →</div>
                    </button>
                ))}
            </div>
        </section>
    );
}

export default HomePage;

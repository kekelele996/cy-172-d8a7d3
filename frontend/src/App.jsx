import React, { useState } from 'react';
import HomePage from './pages/HomePage.jsx';
import GeneratorPage from './pages/GeneratorPage.jsx';
import StrengthPage from './pages/StrengthPage.jsx';
import Base64Page from './pages/Base64Page.jsx';
import URLPage from './pages/URLPage.jsx';
import { HOME_ENTRIES } from './constants/index.js';
import './styles/app.css';

function App() {
  const [view, setView] = useState('home');

  const entry = HOME_ENTRIES.find((item) => item.key === view);

  let content;
  switch (view) {
    case 'generator':
      content = <GeneratorPage />;
      break;
    case 'strength':
      content = <StrengthPage />;
      break;
    case 'base64':
      content = <Base64Page />;
      break;
    case 'url':
      content = <URLPage />;
      break;
    default:
      content = <HomePage onNavigate={setView} />;
  }

  return (
    <div className="app-shell">
      <header className="app-header">
        <button
          type="button"
          className="app-brand"
          onClick={() => setView('home')}
        >
          🛠️ 密码工具箱
        </button>
        {entry ? (
          <nav className="app-nav">
            <button type="button" className="nav-link" onClick={() => setView('home')}>
              首页
            </button>
            <span className="nav-sep">/</span>
            <span className="nav-current">{entry.icon} {entry.title}</span>
          </nav>
        ) : null}
      </header>
      <main className="app-main">{content}</main>
      <footer className="app-footer">
        <span>所有操作均在浏览器本地完成，数据不会上传服务器。</span>
      </footer>
    </div>
  );
}

export default App;

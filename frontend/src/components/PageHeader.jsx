import React from 'react';

function PageHeader({ icon, title, description }) {
    return (
        <header className="page-header">
            <div className="page-title">
                <span className="page-icon">{icon}</span>
                <h2>{title}</h2>
            </div>
            <p className="page-description">{description}</p>
        </header>
    );
}

export default PageHeader;

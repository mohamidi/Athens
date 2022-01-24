import React from 'react';

export const ChatHeader = () => {
    return (
        <header>
            <nav className="navbar navbar-dark bg-dark navbar-expand-md fixed-top justify-content-center" style={{ zIndex: 20 }}>
                <a className="navbar-brand" href="/">
                    <img src="/static/images/logo.png" alt="Athens Logo" height="30" className="d-inline-block align-text-top"></img>
                    Athens
                </a>
            </nav>
        </header>
    )
}

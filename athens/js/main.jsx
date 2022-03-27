import React from 'react';
import ReactDOM from 'react-dom';
import ArticleContainer from './articleContainer';
import Chat from './chat';

function LoadReact(props) {
    const home = "/home/";
    const room = "/room/";
    if (window.location.pathname == home) {
        ReactDOM.render(
            <ArticleContainer />,
            document.getElementById('reactArticles')
        )
    }
    else if (window.location.pathname == room) {
        ReactDOM.render(
            <Chat />,
            document.getElementById('reactChat')
        )
    }
}

LoadReact();


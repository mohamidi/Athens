import React from 'react';
import ReactDOM from 'react-dom';
import ActiveChats from './activeChats';
import ArticleContainer from './articleContainer';
import Chat from './chat';
import ProfileInfo from './profileInfo';

function LoadReact(props) {
    const home = "/home/";
    const room = "/room/";
    const account = "/account/";
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
    else if (window.location.pathname == account) {
        ReactDOM.render(
            <ProfileInfo />,
            document.getElementById('profileInfo')
        )
        ReactDOM.render(
            <ActiveChats />,
            document.getElementById('activeChats')
        )
    }
}

LoadReact();


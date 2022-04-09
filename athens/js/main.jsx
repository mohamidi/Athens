import React from 'react';
import ReactDOM from 'react-dom';
import ActiveChats from './activeChats';
import ArticleContainer from './articleContainer';
import Chat from './chat';
import ProfileInfo from './profileInfo';
import ProfilePic from './profilePic';
import OtherProfile from './otherProfile';

function LoadReact(props) {
    const home = "/home/";
    const room = "/room/";
    console.log();
    console.log(window.location.origin + "/account/")
    const account = "/account/";
    if (window.location.pathname == home) {
        ReactDOM.render(
            <ArticleContainer />,
            document.getElementById('reactArticles')
        )
        ReactDOM.render(
            <ProfilePic />,
            document.getElementById('profilepic')
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
    else if (String(window.location.pathname).substring(0, String(window.location.pathname).lastIndexOf("/")-1) === account) {
        console.log('ok')
        const idNum = String(window.location.pathname).substring(String(window.location.pathname).lastIndexOf("/")-1, String(window.location.pathname).lastIndexOf("/"));
        ReactDOM.render(
            <OtherProfile id={idNum} />,
            document.getElementById('profileInfoId')
        )
        ReactDOM.render(
            <ActiveChats />,
            document.getElementById('activeChats')
        )
    }
}

LoadReact();


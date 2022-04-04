import React from 'react';
import Article from './article';
import { ProfileInfo } from "./profileInfo"
import { ActiveChats } from "./activeChats"

class Profile extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ProfileInfo></ProfileInfo>
            <ActiveChats></ActiveChats>
        );
    }
}

export default Profile;
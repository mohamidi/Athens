import React from 'react';
import Article from './article';
import { COLORS } from './constants';

class ProfilePic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: "",
        };

    }

    componentDidMount() {
        fetch('/api/v1/info/', { credentials: 'same-origin' })
            .then((response) => response.json()).then((data) => {
                console.log(data)
                this.setState({
                    firstname: data["firstname"],
                });
            });
    }

    render() {
        const { firstname } = this.state;
        return (
            <div className={"d-flex flex-column justify-content-center align-items-center"}>
                <div className={"profileHome d-inline-flex ms-1 me-1 mb-3 justify-content-center align-items-center " + COLORS[0]}>
                    <span>{firstname[0]}</span>
                </div>
            </div>
            
        );
    }
}

export default ProfilePic;
import React from 'react';
import Article from './article';
import { COLORS } from './constants';

class OtherProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            firstname: "",
            lastname: "",
        };

    }

    componentDidMount() {
        const { id } = this.props;
        console.log(id);
        fetch('/api/v1/info/'+id, { credentials: 'same-origin' })
            .then((response) => response.json()).then((data) => {
                console.log(data)
                this.setState({
                    email: data["email"],
                    firstname: data["firstname"],
                    lastname: data["lastname"],
                });
            });
    }

    render() {
        const { email, firstname, lastname } = this.state;
        return (
            <div className={"d-flex flex-column justify-content-center align-items-center"}>
                <div className={"profileCircle d-inline-flex ms-1 me-1 mb-3 justify-content-center align-items-center " + COLORS[0]}>
                    <span>{firstname[0]}</span>
                </div>
                <span className={"profileName"}>{firstname} {lastname}</span>
                <span className={"profileEmail"}>{email}</span>
            </div>
        );
    }
}

export default OtherProfile;
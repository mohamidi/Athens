import React from 'react';
import { COLORS } from './constants';

export class Members extends React.Component {
    constructor(props) {
        // Initialize mutable state
        super(props);
        this.state = { members: [] };
    }

    componentDidMount() {
        fetch("http://localhost:8000/api/v1/members/?articleId=" + this.props.articleId,
            { credentials: 'same-origin' })
            .then((response) => {
                if (!response.ok) throw Error(response.statusText);
                return response.json();
            })
            .then((data) => {
                console.log(data)
                this.setState({
                    members: data
                });
            })
            .catch((error) => console.log(error));
    }

    render() {
        const { members } = this.state;
        return (
            <div className="members">
                <div style={{ textAlign: "center" }}>
                    {members.map((member, i) => (
                        <div key={i} className={"circle d-inline-flex ms-1 me-1 justify-content-center align-items-center " + COLORS[member["color"]]}>
                            <span>{member["firstname"][0]}</span>
                        </div>
                    ))}
                </div>

            </div>
        )
    }
}

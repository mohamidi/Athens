import React from 'react';
import { COLORS } from './constants';
import io from "socket.io-client";

let socket = io();
export class Members extends React.Component {
    constructor(props) {
        // Initialize mutable state
        super(props);
        this.state = { members: [] };
    }

    componentDidMount() {
        socket.emit("join", { "articleId": this.props.articleId });
        socket.on("member-added", members => {
            this.setState({
                members: members
            });
        })
        fetch("/api/v1/members/?articleId=" + this.props.articleId,
            { credentials: 'same-origin' })
            .then((response) => {
                if (!response.ok) throw Error(response.statusText);
                return response.json();
            })
            .then((data) => {
                this.setState({
                    members: data
                });
            })
            .catch((error) => console.log(error));
    }

    componentWillUnmount() {
        socket.disconnect();
    }

    render() {
        const { members } = this.state;
        console.log(members)
        return (
            <div className="members">
                <div style={{ textAlign: "center" }}>
                    {members.map((member, i) => (
                        <a href={"/account/" + member['user']}>
                            <div key={i} className={"circle d-inline-flex ms-1 me-1 justify-content-center align-items-center " + COLORS[member["color"]]}>
                                <span>{member["firstname"][0]}</span>
                            </div>
                        </a>
                    ))}
                </div>

            </div>
        )
    }
}

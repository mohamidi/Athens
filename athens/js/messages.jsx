import React from 'react';
import io from "socket.io-client";
import { ReceivedMessage } from "./receivedMessage"
import { SentMessage } from "./sentMessage"

let endpoint = "http://localhost:8000"
let socket = io.connect(endpoint)

export class Messages extends React.Component {
    constructor(props) {
        // Initialize mutable state
        super(props);
        this.state = { messages: [] };
    }

    componentDidMount() {
        socket.on("message", msg => {
            this.setState({
                messages: msg
            })
        })
        fetch("http://localhost:8000/api/v1/messages/?articleId=" + this.props.articleId,
            { credentials: 'same-origin' })
            .then((response) => {
                if (!response.ok) throw Error(response.statusText);
                return response.json();
            })
            .then((data) => {
                this.setState({
                    messages: data
                });
            })
            .catch((error) => console.log(error));
    }

    componentWillUnmount() {
        socket.disconnect()
    }

    getMessage(message, i) {
        if (message["user"] == this.props.userId) {
            return <SentMessage message={message} i={i} />
        }
        return <ReceivedMessage message={message} i={i} />
    }

    render() {
        const { messages } = this.state;
        return (
            <main role="main" className="container-fluid flex-grow-1 overflow-auto pb-3"
                style={{ flexDirection: "column-reverse", display: "flex", paddingTop: 140 }}>
                <div className="row m-0 justify-content-center" style={{ width: "100%" }}>
                    <div className="col-12 p-0">
                        {messages.map(this.getMessage, this)}
                    </div>
                </div>
            </main>
        )
    }
}

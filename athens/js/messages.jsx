import React from 'react';
import io from "socket.io-client";
import { Message } from "./receivedMessage"

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

        fetch("http://localhost:8000/api/v1/messages/", { credentials: 'same-origin' })
            .then((response) => {
                if (!response.ok) throw Error(response.statusText);
                return response.json();
            })
            .then((data) => {
                this.setState({
                    messages: data["messages"]
                });
            })
            .catch((error) => console.log(error));
    }

    getMessage(message, i) {
        // return <Message message={message} />
        return <p className="m-0" key={i}>{message["message"]}</p>
    }

    render() {
        const { messages } = this.state;
        return (
            <main role="main" className="container-fluid flex-grow-1 overflow-auto pb-3"
                style={{ flexDirection: "column-reverse", display: "flex", paddingTop: 60 }}>
                <div className="row m-0 justify-content-center" style={{ width: "100%" }}>
                    <div className="col-6 p-0">
                        {messages.map(this.getMessage)}
                    </div>
                </div>
            </main>
        )
    }
}

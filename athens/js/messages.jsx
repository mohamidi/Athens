import React from 'react';
import io from "socket.io-client";
import { ReceivedMessage } from "./receivedMessage"
import { SentMessage } from "./sentMessage"

let socket = io()

export class Messages extends React.Component {
    constructor(props) {
        // Initialize mutable state
        super(props);
        this.state = { messages: [] };
    }

    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    componentDidMount() {
        socket.on("message", msg => {
            if (msg["articleId"] != this.props.articleId) {
                return;
            }
            this.setState({
                messages: msg["messages"]
            })
        })
        fetch("/api/v1/messages/?articleId=" + this.props.articleId,
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
        this.scrollToBottom();
    }

    componentWillUnmount() {
        socket.disconnect()
    }

    getMessage(message, i) {
        const { messages } = this.state;
        if (message["user"] == this.props.userId) {
            return <SentMessage message={message} i={i} includeIcon={i == 0 || message["user"] != messages[i - 1]["user"]} />
        }
        return <ReceivedMessage message={message} i={i} includeIcon={i == 0 || message["user"] != messages[i - 1]["user"]} />
    }

    render() {
        const { messages } = this.state;
        return (
            <div id="messages" className="messages p-0" style={{ overflowY: 'auto' }}>
                <div className="row m-0 justify-content-center" style={{ width: "100%" }}>
                    <div id="chat-column" className="chat-column col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4 p-0">
                        <div>
                            {messages.map(this.getMessage, this)}
                        </div>
                        <div style={{ float: "left", clear: "both" }}
                            ref={(el) => { this.messagesEnd = el; }}>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

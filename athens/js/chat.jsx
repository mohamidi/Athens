import React from 'react';
import { ChatHeader } from "./chatHeader"
import { ChatFooter } from "./chatFooter"
import { Messages } from "./messages"

class Chat extends React.Component {
    constructor(props) {
        // Initialize mutable state
        super(props);
        this.state = { userId: 0, roomId: 0 }
        this.articleId = new URLSearchParams(window.location.search).get("articleId");
    }

    componentDidMount() {
        fetch("/api/v1/rooms/?articleId=" + this.articleId,
            { credentials: 'same-origin' })
            .then((response) => {
                if (!response.ok) throw Error(response.statusText);
                return response.json();
            })
            .then((data) => {
                this.setState({
                    userId: data["userId"],
                    roomId: data["roomId"],
                });
            })
            .catch((error) => console.log(error));
    }

    render() {
        const { userId } = this.state;
        return (
            <div className="chat">
                <ChatHeader articleId={this.articleId} />
                <div className="container">
                    <div className="row">
                        <Messages articleId={this.articleId} userId={userId} />
                    </div>
                    <div className="row">
                        <ChatFooter articleId={this.articleId} />
                    </div>
                </div>
            </div>
        );
    }
}

export default Chat;
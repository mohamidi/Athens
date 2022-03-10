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
    fetch("http://localhost:8000/api/v1/rooms/?articleId=" + this.articleId,
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
    const { userId, roomId } = this.state;
    return (
      <div className="chat">
        <ChatHeader articleId={this.articleId} />
        <Messages articleId={this.articleId} userId={userId} />
        <ChatFooter articleId={this.articleId} />
      </div>
    );
  }
}

export default Chat;
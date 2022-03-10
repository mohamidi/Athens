import React from 'react';
import { ChatHeader } from "./chatHeader"
import { ChatFooter } from "./chatFooter"
import { Messages } from "./messages"

class Chat extends React.Component {
  constructor(props) {
    // Initialize mutable state
    super(props);
    this.articleId = new URLSearchParams(window.location.search).get("article");
  }

  render() {
    return (
      <div className="messages d-flex flex-column">
        <ChatHeader articleId={this.articleId} />
        <Messages articleId={this.articleId} userId={2} />
        <ChatFooter articleId={this.articleId} />
      </div>
    );
  }
}

export default Chat;
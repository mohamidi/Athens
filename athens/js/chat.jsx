import React from 'react';
import { ChatHeader } from "./chatHeader"
import { ChatFooter } from "./chatFooter"
import { Messages } from "./messages"

class Chat extends React.Component {
  constructor(props) {
    // Initialize mutable state
    super(props);
    this.state = { messages: [], article: {}, members: [], roomid: 0, userid: 0 };
    this.articleId = new URLSearchParams(window.location.search).get("article");
  }

  componentDidMount() {
    fetch("http://localhost:8000/api/v1/room/?article=" + this.articleId,
      { credentials: 'same-origin' })
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((data) => {
        this.setState({
          messages: data["messages"],
          members: data["members"],
          article: data["article"],
          userid: data["userid"],
          roomid: data["roomid"]
        });
      })
      .catch((error) => console.log(error));
  }

  render() {
    const { messages, article, members, roomid, userid } = this.state;
    <div className="messages d-flex flex-column">
      <ChatHeader articleData={article} members={members} />
      <Messages messages={messages} members={members} />
      <ChatFooter roomid={roomid} userid={userid} />
    </div>
  }
}

export default Chat;
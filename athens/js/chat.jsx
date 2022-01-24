import React from 'react';
import { ChatHeader } from "./chatHeader"
import { ChatFooter } from "./chatFooter"
import { Messages } from "./messages"

const Chat = () => {
  return (
    <div className="messages d-flex flex-column">
      <ChatHeader />
      <Messages />
      <ChatFooter />
    </div>
  );
}

export default Chat;
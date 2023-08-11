import React from "react";
import "./ChatContainer.css";
import Logout from "./Logout";
import ChatInput from "./ChatInput";
import Messages from "./Messages";

function ChatContainer({ currentChat }) {
    // console.log(currentChat)
    const handelSendMsg =(msg)=>{
      alert(msg)
    }

  return (
    <>
    { currentChat && (
    <div className="container4">
      <div className="chat-header">
        <div className="user-details">
          <div className="avatar4">
            <img
              src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
              alt="avatar"
            />
          </div>
          <div className="username4">
            <h3>{currentChat.username}</h3>
          </div>
        </div>
        <Logout/>
      </div>

      <Messages />
      <ChatInput handelSendMsg={handelSendMsg}/>
    </div>
    )}
    </>
  );
}

export default ChatContainer;

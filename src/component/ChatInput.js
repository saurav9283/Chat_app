import React, { useState } from "react";
import "./ChatInput.css";
import Picker from "emoji-picker-react";
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmileFill } from "react-icons/bs";

function ChatInput({ handelSendMsg }) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [msg, setMsg] = useState("");

  const handelEmojiHideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handelEmojiClick = (event, emojiObject) => {
    // console.log(emojiObject);
    let message = msg;
    message += emojiObject.emoji;
    setMsg(message);
  };

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handelSendMsg(msg); // pass msg to the parent component
      setMsg("");
    }
  };

  return (
    <div className="container5">
      <div className="button-container">
        <div className="emoji">
          <BsEmojiSmileFill onClick={handelEmojiHideShow} />
          {showEmojiPicker && <Picker onClick={handelEmojiClick} />}
        </div>
      </div>
      <form className="input-container" onSubmit={(e) => sendChat(e)}>
        <input
          type="text"
          placeholder="Type your message here"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <button className="submit">
          <IoMdSend />
        </button>
      </form>
    </div>
  );
}

export default ChatInput;
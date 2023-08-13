import React, { useEffect, useState, useRef } from "react";
import Logout from "./Logout";
import ChatInput from "./ChatInput";
import "./ChatContainer.css";
import axios from "axios";
import { getAllMessagesRoute, sendMessageRoute , host } from "../utile/APIRouts";
import {io} from 'socket.io-client';


function ChatContainer({ currentChat, currentuser , socket }) {
  const [arivalMessage , setArivalMessage] = useState(null);
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  useEffect(() => {
    const fetchData = async () => {
      // console.log(currentuser.user._id , currentChat._id)
      try {
        const response = await axios.post(getAllMessagesRoute, {
          from: currentuser.user._id,
          to: currentChat._id,
        });
        setMessages(response.data);
      } catch (error) {
        console.error("Error to post the message:", error);
      }
    };

    fetchData();
  }, [currentChat]);

  useEffect(() => {
    const getCurrentChat = async () => {
      if (currentChat) {
        const savedChat = JSON.parse(
          localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        );
  
        if (savedChat && savedChat._id) {
          console.log(savedChat._id);
        }
      }
    };
    getCurrentChat();
  }, [currentChat]);
  

  // console.log(currentChat)
  const handelSendMsg = async (msg) => {
    try {
      await axios.post(sendMessageRoute, {
        from: currentuser.user._id,
        to: currentChat._id,
        message: msg,
      });
      socket.current.emit("send-msg", {
        to: currentChat._id,
        from: currentuser.user._id,
        message: msg,
      });
      console.log("Message sent successfully");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  
    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg }); // Corrected variable name to 'msgs'
    setMessages(msgs);
  };
  

  useEffect(() => { // this is run when the component is loded
    if(socket?.current)
    {
      socket.current.on("msg-recieve", (msg) => {
        setArivalMessage({fromSelf:false, message:msg});
      });
    }
  },[]);

  
  useEffect(() => {
    arivalMessage && setMessages((prev) => [...prev, arivalMessage]);
  }, [arivalMessage]);

  useEffect(() => { // scroll to view new messages
    scrollRef.current?.scrollIntoView({behaviour:"smooth"}) 
  },[messages])
  

  return (
    <>
      {currentChat && (
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
            <Logout />
          </div>

          {/* <Messages /> */}
          <div className="chat-messages">
            {/* {messages.map((message, index) => (
              <div key={index}>
                <div
                  className={
                    message.sender === currentuser.user._id
                      ? "message sended"
                      : "message received"
                  }
                >
                  <div className="content">
                    <p>{message.message.text}</p>
                  </div>
                </div>
              </div>
            ))} */}
            {messages.map((message) => {
          return (
            <div>
              <div
                className={`message ${
                  message.fromSelf ? "sended" : "recieved"
                }`}
              >
                <div className="content ">
                  <p>{message.message}</p>
                </div>
              </div>
            </div>
          );
        })}
          </div>

          <ChatInput handelSendMsg={handelSendMsg} />
        </div>
      )}
    </>
  );
}

export default ChatContainer;

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Chat.css";
import { useNavigate } from "react-router-dom";
import Contacts from "../component/Contacts";
import { allusersRoute } from "../utile/APIRouts.js";
import { setAvatar } from "../pages/Avatar.js";
import Welcome from "../component/Welcome";
import ChatContainer from "../component/ChatContainer";

function Chat() {
  const navigate = useNavigate();
  const [contacts, setcontacts] = useState([]);
  const [currentuser, setCurrentUser] = useState(undefined);
  const [currentChat , setCurrentChat] = useState(undefined);
  const [isloaded , setIsLoaded] = useState(false);

  useEffect(() => {
    // for checking usere exist in localstorage or not
    const fetchuser = async () => {
      const storedUser = localStorage.getItem("chat-app-user");

      if (!storedUser) {
        navigate("/login");
      } else {
        const userFromLocalStorage = JSON.parse(storedUser);
        setCurrentUser(userFromLocalStorage);
        setIsLoaded(true);
      }
    };

    fetchuser();
  }, []);

  useEffect(() => {
    // for fetching the contacts details
    const fetchdata = async () => {
      try {
        if (currentuser) {
          const data = await axios.get(`${allusersRoute}`);
          // console.log(data)
          setcontacts(data.data);
        } 
        // else {
          // navigate("/Avatar");  // image set krna hai
        // }
      } catch (error) {
        console.log("Error fetching data", error);
      }
    };
    fetchdata();
  }, [currentuser]);

  const handelChatChange = (chat)=>{
    setCurrentChat(chat);
  };


  return (
    <div className="box">
      <div className="container2">
        <Contacts contacts={contacts} currentuser={currentuser} changeChat = {handelChatChange} />
        {
          isloaded && currentChat === undefined ?
          (<Welcome currentuser={currentuser} />) : (<ChatContainer currentChat={currentChat}/>)
        }

      </div>
    </div>
  );
}

export default Chat;

import React, { useState, useEffect } from "react";
import Logo from "../assects/logo.svg";
import "./Contacts.css";

function Contacts({ contacts, currentuser, setCurrentChat }) {
  // const [currentUserName, setCurrentUserName] = useState(undefined);
  // const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined); // for the chat

  // useEffect(() => {
  //   if (currentuser) {
  //     setCurrentUserImage(currentuser.user.avatarImage);
  //     setCurrentUserName(currentuser.user.username);
  //   }
  // }, [currentuser]);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    // setCurrentChat(contact); // Call the function to update the current chat
  };
  return (
    <>
      {currentuser && (
        <div className="container1">
          <div className="brand1">
            <img src={Logo} alt="logo"/>
            <h3>snappy</h3>
          </div>
          <div className="contacts1">
            {contacts.map((contact, index) => {
              if(currentuser.user._id !== contact._id)
              return (
                <div
                  key={contact._id}
                  className={`contact1 ${
                    index === currentSelected ? "selected1" : ""
                  }`}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div className="avatar1">
                    
                    <img  src={`data:image/svg+xml;base64,${contact.avatarImage}`} alt="avatar" />

                  </div>
                  <div className="username1">
                    <h3>{contact.username}</h3>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="current-user1">
            <div className="avatar2">
              <img
                src={`data:image/svg+xml;base64,${currentuser.user.avatarImage}`}
                alt="avatar"
              />
            </div>
            <div className="username1">
              <h2>{currentuser.user.username}</h2>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Contacts;

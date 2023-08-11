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
          <div className="brand">
            <img src={Logo} alt="logo" className="image"/>
            <h3>snappy</h3>
          </div>
          <div className="contacts">
            {contacts.map((contact, index) => {
              if(currentuser.user._id !== contact._id)
              return (
                <div
                  key={contact._id}
                  className={`contact ${
                    index === currentSelected ? "selected" : ""
                  }`}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div className="avatar">
                    
                    <img className="profile" src={`data:image/svg+xml;base64,${contact.avatarImage}`} alt="avatar" />

                  </div>
                  <div className="username">
                    <h3>{contact.username}</h3>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="current-user">
            <div className="avatar">
              <img
                src={`data:image/svg+xml;base64,${currentuser.user.avatarImage}`}
                alt="avatar"
              />
            </div>
            <div className="username">
              <h2>{currentuser.user.username}</h2>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Contacts;

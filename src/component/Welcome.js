import React from "react";
import Robot from "../assects/robot.gif";
import './Welcome.css';

function Welcome({ currentuser }) {
//   console.log(currentuser.user.username);
  return (
    <div className="container3">
        <img src={Robot} alt="Robot" />
        <h1>
          Welcome, <span>{currentuser.user.username}</span>
        </h1>
        <h2>Please select a chat to start baat chit</h2>
    </div>
  );
}

export default Welcome;

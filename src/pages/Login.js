import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assects/logo.svg";
import "./Register.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginRoute } from "../utile/APIRouts.js";

function Login() {
  const navigate = useNavigate();
  const [value, setvalue] = useState({
    username: "",
    password: "",
  });
  const toastVeriable = {
    possition: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handelSubmit = async (event) => {
    event.preventDefault();
    if (handelValidation()) {
      // console.log("in validation", loginRoute);
      const { username, password } = value;
      try {
        const { data , status } = await axios.post(loginRoute, {
          username,
          password,
        });
        // console.log(data ,  status)
        if(data.status === false)
        {
          console.log(data ,  status)
          toast.error(data.msg, toastVeriable);
        }
        else
        {
            localStorage.setItem("chat-app-user", JSON.stringify(data));
            navigate("/");
        }
        // if (data.ststus === false) {
        //   toast.error(data.msg, toastVeriable);
        // }
        // if (data === true) {
        //   localStorage.setItem("chat-app-user", JSON.stringify(data.user)); // pass user information i localstorage in not json formate
        //   navigate("/");
        // }
      } catch (err) {
        console.log(err.message);
      }
    }
  };

  const handelValidation = () => {
    const { password, username } = value;
    if (password === "") {
      toast.error(
        "Email and Password is required",
        toastVeriable
      );
      return false;
    } else if (username.length === "") {
      toast.error(
        "Email and Password is required",
        toastVeriable
      );
      return false;
    } 
    return true;
  };

  const handelChange = (event) => {
    setvalue({ ...value, [event.target.name]: event.target.value });
  };

  return (
    <>
      <div className="form-container">
        <form onSubmit={(event) => handelSubmit(event)} className="form">
          <div className="brand">
            <img src={Logo} alt="Logo"></img>
            <h1>snappy</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            min="3"
            onChange={(e) => handelChange(e)}
          />
          <input
            type="password"
            placeholder="password"
            name="password"
            onChange={(e) => handelChange(e)}
          />
          <button type="submit">Login User</button>

          <span>
            Don't have an account? <Link to="/register">Register</Link>
          </span>
        </form>
        <ToastContainer />
      </div>
    </>
  );
}

export default Login;

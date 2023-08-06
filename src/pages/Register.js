import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assects/logo.svg";
import "./Register.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { registerRoute } from "../utile/APIRouts.js";

function Register() {
  const navigate = useNavigate();
  const [value, setvalue] = useState({
    username: "",
    email: "",
    password: "",
    conformpassword: "",
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
      console.log("in validation", registerRoute);
      const { username, email, password } = value;
      try {
        const { data , status } = await axios.post(registerRoute, {
          username,
          email,
          password,
        });
        console.log(data ,  status)
        if(status === 203)
        {
            toast.error(
                data,
                toastVeriable
              );
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
    const { password, conformpassword, username, email } = value;
    if (password !== conformpassword) {
      toast.error(
        "Password and confirm password should be the same.",
        toastVeriable
      );
      return false;
    } else if (username.length < 3) {
      toast.error(
        "Username should be greater than 3 characters.",
        toastVeriable
      );
      return false;
    } else if (password.length < 8) {
      toast.error(
        "Password should be equal or greater than 8 characters.",
        toastVeriable
      );
      return false;
    } else if (email === "") {
      toast.error("Email is required.", toastVeriable);
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
            onChange={(e) => handelChange(e)}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => handelChange(e)}
          />
          <input
            type="password"
            placeholder="password"
            name="password"
            onChange={(e) => handelChange(e)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="conformpassword"
            onChange={(e) => handelChange(e)}
          />

          <button type="submit">Create User</button>

          <span>
            Already have an account? <Link to="/login">Login</Link>
          </span>
        </form>
        <ToastContainer />
      </div>
    </>
  );
}

export default Register;

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assects/logo.svg";
import "./Register.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginRoute } from "../utile/APIRouts"; // Corrected typo

function Login() {
  const navigate = useNavigate();
  const [value, setValue] = useState({
    username: "",
    password: "",
  });
  const toastVariables = {
    position: "bottom-right", // Corrected typo
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) {
      navigate("/");
    }
  }, [navigate]); // Added navigate as a dependency

  const handleValidation = () => {
    const { password, username } = value;
    if (password === "" || username === "") { // Fixed condition for username
      toast.error("Username and Password are required", toastVariables);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => { // Renamed handelSubmit to handleSubmit
    event.preventDefault();
    if (handleValidation()) {
      const { username, password } = value;
      try {
        const { data, status } = await axios.post(loginRoute, {
          username,
          password,
        });
        if (status === 200 && data.status === false) { // Added status check
          toast.error(data.msg, toastVariables);
        } else {
          localStorage.setItem("chat-app-user", JSON.stringify(data));
          navigate("/");
        }
      } catch (err) {
        console.log(err.message);
      }
    }
  };

  const handleChange = (event) => { // Renamed handelChange to handleChange
    setValue({ ...value, [event.target.name]: event.target.value });
  };

  return (
    <>
      <div className="form-container">
        <form onSubmit={handleSubmit} className="form">
          <div className="brand">
            <img src={Logo} alt="Logo" />
            <h1>snappy</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            min="3"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
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

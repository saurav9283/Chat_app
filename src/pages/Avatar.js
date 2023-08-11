import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../assects/loader.gif";
import './Avatar.css';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { setAvatarRoute } from "../utile/APIRouts.js"; // Make sure to import the correct API route
import { Buffer } from "buffer";

function Avatar() {
  const api = "https://api.multiavatar.com/49678945";
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined); // Corrected variable name

  const toastVariables = {
    position: "top-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  // useEffect(()=> {
  //   if(!localStorage.getItem("chat-app-user")) 
  //   {
  //     navigate('/')
  //   }
  // },[])

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar", toastVariables); // Corrected variable name
    } else {
        const user = JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      );

      try {
        const response = await axios.post(`${setAvatarRoute}/${user._id}`, {
          image: avatars[selectedAvatar],
        });
        const data = response.data;
        console.log(data)

        if (data.isSet) {
          user.isAvatarImageSet = true;
          user.avatarImage = data.image;
          localStorage.setItem(
            process.env.REACT_APP_LOCALHOST_KEY,
            JSON.stringify(user)
          );
          navigate("/");
        } else {
          toast.error("Error setting avatar. Please try again.", toastVariables);
        }
      } catch (error) {
        console.error("Error setting avatar:", error);
        toast.error("An error occurred. Please try again.", toastVariables);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = [];
        for (let i = 0; i < 4; i++) {
          const image = await axios.get(`${api}/${Math.round(Math.random() * 1000)}`);
          const buffer = Buffer.from(image.data);
          data.push(buffer.toString("base64"));
        }
        setAvatars(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching avatars:", error);
        setLoading(false); // Set loading to false even in case of error
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {loading ? (
        <div className="imhload">
          <img src={Loader} alt="loading" />
        </div>
      ) : (
        <div className="avatarr">
          <div className="total-avatar">
            <h1>Pick an Avatar as your Profile Picture</h1>
          </div>
          <div className="avatars">
            {avatars.map((avatar, index) => (
              <div
                key={index}
                className={`avatar ${selectedAvatar === index ? "selected" : ""}`}
                onClick={() => setSelectedAvatar(index)}
              >
                <img className="profile" src={`data:image/svg+xml;base64,${avatar}`} alt="avatar" />
              </div>
            ))}
          </div>
          <button className="setProfile" onClick={setProfilePicture}>
            Set as Profile Pic
          </button>
          <ToastContainer {...toastVariables} />
        </div>
      )}
    </>
  );
}

export default Avatar;

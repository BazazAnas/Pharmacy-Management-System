import React from "react";
import "./../styles/logout.css";
import CustomNavbar from "./CustomNavbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LogOut() {
  const navigate = useNavigate();
  async function handleClick(){
    try {
      await axios.post(
        "http://localhost:3500/logout",
        {},
        {
          withCredentials: true,
        }
      );
      navigate("/");
    } catch (error) {
      console.error("Error while logging out:", error);
      alert("Failed to log out. Please try again.");
    }
  };

  return (
    <>
      <CustomNavbar />
      <div className="body">
        <div className="container">
          <div className="heading">
            <h1>Do you want to Logout?</h1>
          </div>
          <div className="logoutButton">
            <button onClick={handleClick} className="logout">
              <b>Logout</b>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default LogOut;
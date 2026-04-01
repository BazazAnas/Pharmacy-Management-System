import React from "react";
import "./../styles/create.css";
import CustomNavbar from "./CustomNavbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Create() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3500/create",
        { username, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        navigate("/login");
      } else {
        console.log("user exists");
      }
    } catch (error) {
      setError("Server Error");
      console.log(error);
    }
  }

  return (
    <>
      <CustomNavbar />
      <div className="body">
        <div className="register-container">
          <div className="register-box">

            {/* Icon */}
            <div className="box">
              <div className="register_icon">✚</div>

              <div>
                <h2>Create Account</h2>
                <p className="register-subtitle">Set up your pharmacy dashboard access</p>
              </div>
            </div>

            <form className="register-form" onSubmit={handleSubmit}>

              <div className="input-group">
                <label htmlFor="username">Username</label>
                <input
                  id="username"
                  type="text"
                  placeholder="Choose a username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  placeholder="Choose a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button className="Register-button" type="submit">
                <span>Create Account</span>
              </button>

              {error && <div className="register-error">{error}</div>}

            </form>

            <div className="login_container">
              <p>
                Already have an account?{" "}
                <button className="login-button" onClick={() => navigate("/login")}>
                  Sign in
                </button>
              </p>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default Create;
import React from "react";
import "./../styles/login.css";
import CustomNavbar from "./CustomNavbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [error, setError] = React.useState("");

    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:3500/login",
                { username, password },
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );
            if (response.status === 200) {
                navigate("/dashboard");
            } else {
                setError("Invalid Credentials");
            }
        } catch (error) {
            console.log(error)
            setError("Server Error");
        }
    }

    function createNewUser() {
        navigate("/create");
    }

    return (
        <>
            <CustomNavbar />
            <div className="body">
                <div className="login-container">
                    <div className="login-box">

                        {/* Icon */}
                        <div className="login_icon">💊</div>

                        <h2>Welcome Back</h2>
                        <p>Sign in to your pharmacy dashboard</p>

                        <form className="login-form" onSubmit={handleSubmit}>

                            <div className="input-group">
                                <label htmlFor="username">Username</label>
                                <input
                                    onChange={(e) => setUsername(e.target.value)}
                                    type="text"
                                    id="username"
                                    name="username"
                                    value={username}
                                    placeholder="Enter your username"
                                    required
                                />
                            </div>

                            <div className="input-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    onChange={(e) => setPassword(e.target.value)}
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={password}
                                    placeholder="Enter your password"
                                    required
                                />
                            </div>

                            <button onClick={handleSubmit} type="submit" className="login_button">
                                <span>Sign In</span>
                            </button>

                            {error && <div className="login-error">{error}</div>}

                        </form>

                        <div className="register-container">
                            <p>
                                Don't have an account?{" "}
                                <button className="register-button" onClick={createNewUser}>
                                    Register
                                </button>
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
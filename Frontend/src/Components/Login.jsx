import React from "react";
import "./../styles/login.css";
import CustomNavbar from "./CustomNavbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login(){
    const [username,setUsername] = React.useState("");
    const [password,setPassword] = React.useState("");
    const [error,setError] = React.useState("")

    const navigate = useNavigate();

    async function handleSubmit(event){
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:3500/login",
                {username,password},
                {
                headers: { 'Content-Type': 'application/json'},
               withCredentials: true,
            });
            if (response.status === 200) {
                navigate("/dashboard")
            } else{
                setError('Invalid Cridentials');
            }
        } catch (error) {
            setError('Server Error');
        }
    }
     function createNewUser(){
        navigate("/create")
     }
   
    return(
    <>
    <CustomNavbar />
    <div className="body">
    <div className="login-container">
    <div className="login-box">
        <h2>Welcome Back!</h2>
        <p>Please log in to your account</p>
        <form className="login-form">
            <div className="input-group">
                <label htmlFor="username">Username</label>
                <input 
                onChange={(event)=>{setUsername(event.target.value)}} 
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
                onChange={(event)=>{setPassword(event.target.value)}}  
                type="password" 
                id="password" 
                name="password" 
                value={password}
                placeholder="Enter your password" 
                required 
                />
            </div>
            <button onClick={handleSubmit} type="submit" className="login_button">Log In</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            
        </form>
        <div className="register-container">
        <p>Don't have an account? <button className="register-button" onClick={createNewUser}>Register</button></p>
        </div>
    </div>
    </div>
    </div>
</>
    );
}

export default Login;
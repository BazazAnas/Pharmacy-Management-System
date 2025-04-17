import React from "react";
import { useNavigate } from "react-router-dom";
import "./../styles/customnavbar.css"

function CustomNavbar(){
const navigate = useNavigate();
    return(
        <nav>
        <div className="logo"><link rel="shortcut icon" href="/medicine_icon.png" type="image/x-icon" /> P M S</div>
        <div className="menu">
            <button onClick={() =>{ navigate('/')}}>Home</button>
            <button onClick={() =>{ navigate('/login')}}>Login</button>
        </div>
    </nav>
    )
}

export default CustomNavbar;
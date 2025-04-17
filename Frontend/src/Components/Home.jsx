import React from "react";
import CustomNavbar from "./CustomNavbar"
import "./../styles/home.css";

function Home (){
    return(
<>
    <CustomNavbar />    
    <div className="content">
        <div className="left">
            PMS
        </div>
        <div className="right">
            <p>
            A Pharmacy Management System (<strong>PMS</strong> ) is a software solution designed to streamline 
            and automate various operations within a pharmacy. It helps in managing inventory,
            prescription processing, billing, and maintaining customer records. The system 
            typically enables pharmacists to efficiently track and manage stock levels, handle 
            prescription orders, and manage medication dispensing while ensuring accuracy in dispensing
            the right medication.
            </p>
        </div>
    </div>
</>
    )
}

export default Home;
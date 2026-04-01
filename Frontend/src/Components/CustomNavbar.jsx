import { useNavigate } from "react-router-dom";
import "./../styles/customnavbar.css";

function CustomNavbar() {
    const navigate = useNavigate();

    return (
        <nav className="navbar">
            {/* Logo — clicks to home */}
            <div className="navbar_logo" onClick={() => navigate("/")}>
                <div className="navbar_logo_icon">💊</div>
                <span className="navbar_logo_text">
                    PMS
                </span>
            </div>

            <div className="navbar_menu">
                <button className="navbar_btn_login" onClick={() => navigate("/login")}>
                    Login
                </button>
            </div>
        </nav>
    );
}

export default CustomNavbar;
import React from "react";
import userContext from "../contexts/UserContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

function Header(){

    const loggedData = useContext(userContext);
    const navigate = useNavigate();

    function logout(){
        localStorage.removeItem("nutrition-tracker-app");
        loggedData.setLoggedUser(null);
        navigate("/login");
    }

    return (
        

            <div className="header-items">
                <a href="/track">Track</a>
                {/* <li><Link to="/diet">Diet</Link></li> */}
                <a href="/diet">Diet</a>
                <div className="logout" onClick={logout}>Logout</div>
            </div>

        
    )

}

export default Header;
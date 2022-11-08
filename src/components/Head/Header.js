import React from "react";
import "./Header.css";
import logo from "../../assets/images/logo3.png"

const Header = () => {

    return (
        <div className="headerContainer">
            <div className="leftSide">
                <img src={logo} />
                <h1>Bankerost</h1>
            </div>
        </div>
    )
}

export default Header
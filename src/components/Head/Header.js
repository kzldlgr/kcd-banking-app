import React from "react";
import "./Header.css";
import logo from "../../images/logo3.png"


const Header = () => {
    return (
        <>
            <div className="headerContainer">
                <div className="leftSide">
                    <img src={logo}/>
                    <h1>Bankerost</h1>
                </div>
                <div className="rightSide">
                    <p>Change Account</p>
                </div>
            </div>
        </>
    )
}

export default Header


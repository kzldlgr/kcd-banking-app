import React from "react";
import "./Header.css";
import logo from "../../assets/images/logo3.png"


const Header = () => {

    const user = JSON.parse(sessionStorage.getItem('user'))

    return (
        <>
            <div className="headerContainer">
                <div className="leftSide">
                    <img src={logo}/>
                    <h1>Bankerost</h1>
                </div>
                <div className="rightSide">
                    <span>{`${user.firstname}`}</span>
                    <p>Change Account</p>
                </div>
            </div>
        </>
    )
}

export default Header
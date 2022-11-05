import React from "react";
import "./Header.css";
import logo from "../../assets/images/logo3.png"
import addicon from '../../assets/images/addicon.png'

const Header = () => {

    const users = JSON.parse(sessionStorage.getItem('user'));



    return (
        <div className="headerContainer">
            <div className="leftSide">
                <img src={logo} />
                <h1>Bankerost</h1>
            </div>
            <div className="rightSide">
                <div>
                    <button><image src = { addicon }/></button>
                </div>
            </div>
        </div>
    )
}

export default Header
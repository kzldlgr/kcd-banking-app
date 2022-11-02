import React from "react";
import "./Header.css";
import logo from "../../assets/images/logo3.png"

// let show;

const Header = () => {

    const user = JSON.parse(sessionStorage.getItem('user'));
    
    // if(user.length == 0){
    //     show = false;
    //     return
    // }
    // show = true;


    return (
            <div className="headerContainer">
                <div className="leftSide">
                    <img src={logo}/>
                    <h1>Bankerost</h1>
                </div>
                <div className="rightSide">
                    {/* {
                    show ? <span>Hi, {user.firstname} {user.lastname}</span> : null
                } */}
                </div>
            </div>
    )
}

export default Header
import React, { useContext } from "react";
import { UsersContext } from "../../context/UsersContext";
import "./Header.css";
import logo from "../../assets/images/logo3.png"

// let show;

const Header = () => {
    const [loggedIn, setLoggedIn] = useContext(UsersContext)
    
    // if(loggedIn.length === 0){
    //     show = false;
    // }else{
    // show = true;
    // }

    // console.log(show)
    console.log(loggedIn)
    
    return (
        <>
            <div className="headerContainer">
                <div className="leftSide">
                    <img src={logo}/>
                    <h1>Bankerost</h1>
                </div>
                <div className="rightSide">
                            <span>{`Hi, ${loggedIn.firstname} ${loggedIn.lastname}`}</span>

                </div>
            </div>
        </>
    )
}

export default Header
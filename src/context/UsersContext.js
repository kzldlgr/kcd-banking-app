import React, { createContext, useState, useEffect } from "react";
import usersDemoData from '../components/usersData'

export let UsersContext = createContext({});

export const UsersContextProvider = ({children}) => {

    const [users, setUsers] = useState(
        localStorage.getItem('users') === null ? localStorage.setItem('users', JSON.stringify(usersDemoData)) : JSON.parse(localStorage.getItem('users'))
    );
        
    const [userBalance, setUserBalance] = useState('0.00');

    const [userInfo, setUserInfo] = useState([]);

    const [loginUser, setLoginUser] = useState([]);

    useEffect(() => {
        setUsers(JSON.parse(localStorage.getItem('users')))
    }, [])

    useEffect(() => {
        console.log(users)
    }, [users])

    return (
        <UsersContext.Provider value={{users, setUsers, userBalance, setUserBalance, userInfo, setUserInfo, loginUser, setLoginUser}}>
            {children}
        </UsersContext.Provider>
    )
}
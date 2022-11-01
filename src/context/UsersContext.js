import React, { createContext, useState, useEffect } from "react";
import usersDemoData from '../components/usersData'

let usersData = JSON.parse(localStorage.getItem('users'));
export let UsersContext = createContext({});

export const UsersContextProvider = ({children}) => {

    const [users, setUsers] = useState(
        localStorage.getItem('users') === null ? localStorage.setItem('users', JSON.stringify(usersDemoData)) : []
    );

    useEffect(() => {
        setUsers(usersData)
    }, [users])

    return (
        <UsersContext.Provider value={[users, setUsers]}>
            {children}
        </UsersContext.Provider>
    )
}
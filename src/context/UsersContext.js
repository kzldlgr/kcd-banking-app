import React, { createContext, useState, useEffect } from "react";
import usersDemoData from '../components/usersData'

export let UsersContext = createContext({});

export const UsersContextProvider = ({children}) => {

    const [users, setUsers] = useState(
        localStorage.getItem('users') === null ? localStorage.setItem('users', JSON.stringify(usersDemoData)) : []
    );

    useEffect(() => {
        setUsers(JSON.parse(localStorage.getItem('users')))
    }, [])

    return (
        <UsersContext.Provider value={[users, setUsers]}>
            {children}
        </UsersContext.Provider>
    )
}
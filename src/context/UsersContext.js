import React, { createContext, useState, useEffect } from "react";
import usersDemoData from '../components/usersData'

export const UsersContext = createContext();

export const UsersContextProvider = ({children}) => {

    const [users, setUsers] = useState(
        localStorage.getItem('users') === null ? localStorage.setItem('users', JSON.stringify(usersDemoData)) : []
    );

    useEffect(() => {
        setUsers(localStorage.getItem('users'))
    }, [users])

    return (
        <UsersContext.Provider value={[users, setUsers]}>
            {children}
        </UsersContext.Provider>
    )
}
import React, { createContext, useState } from "react";
import usersDemoData from '../components/usersData'

export const UsersContext = createContext();

export const UsersContextProvider = ({children}) => {
    
    const [loggedIn, setLoggedIn] = useState();

    return (
        <UsersContext.Provider value={[loggedIn, setLoggedIn]}>
            {children}
        </UsersContext.Provider>
    )
}

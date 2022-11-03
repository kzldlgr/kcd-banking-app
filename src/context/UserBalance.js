import React, { createContext, useState } from "react";

export const UserBalanceContext = createContext({});

export const UserBalanceContextProvider = ({children}) => {

    const [userBalance, setUserBalance] = useState([]);

    return (
        <UserBalanceContext.Provider value={[userBalance, setUserBalance]}>
            {children}
        </UserBalanceContext.Provider>
    )
}
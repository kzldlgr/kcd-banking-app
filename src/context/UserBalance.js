import React, { createContext, useState } from "react";

export const UserBalanceContext = createContext({});

export const UserBalanceContextProvider = ({children}) => {

    const [userBalance, setUserBalance] = useState('0.00');

    return (
        <UserBalanceContext.Provider value={[userBalance, setUserBalance]}>
            {children}
        </UserBalanceContext.Provider>
    )
}
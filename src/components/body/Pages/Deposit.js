import React, {useContext} from "react"
import { UsersContext } from "../../../context/UsersContext"

export default function Deposit({children}){
    const [loggedIn, setLoggedIn] = useContext(UsersContext)
    console.log(loggedIn)
    return (
        <div className='pages'>
            Deposit
            {children}
        </div>
    )
}
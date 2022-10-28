import React, {useContext} from "react"
import { UsersContext } from "../../../context/UsersContext"

export default function Deposit({children}){
    const [loggedIn, setLoggedIn] = useContext(UsersContext)
    
    return (
        <div className='pages'>
            {`Hi ${loggedIn.firstname} ${loggedIn.lastname}, do you want to deposit?`}
            {children}
        </div>
    )
}
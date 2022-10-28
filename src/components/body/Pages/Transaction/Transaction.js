import Data from "../../../usersData"
import './Transaction.css'
import React, { useState, useContext } from "react"
import { UsersContext } from "../../../../context/UsersContext";


export default function Transaction({ children }) {

    const [user, setUser] = useState(Data) // dummy data
    const [loggedIn, setLoggedIn] = useContext(UsersContext) 
    let person = user.filter((name => { return name.firstname === 'Daniel' }))
    let history = person.map((history) => history.myhistory);
    
    // history[0].forEach((e) => {
    //     console.log(e.date)
    //     console.log(e.description)
    //     console.log(e.amount)
    // })
console.log(loggedIn.firstname)
    return (
        <div className='transaction'>
            <table>
                <thead>
                    <tr>
                        <th>DATE</th>
                        <th>DESCRIPTION</th>
                        <th>AMOUNT</th>
                    </tr>
                </thead>

                <tbody>
                    {history[0].map((e) => (
                        <tr>
                            <td>{e.date}</td>
                            <td>{e.description}</td>
                            <td>{e.amount}</td>
                        </tr>
                    ))
                    }
                </tbody>
            </table>
        </div>
    )


}


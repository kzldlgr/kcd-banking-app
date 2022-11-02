import React from "react"
import './Transaction.css'

let history

export default function Transaction({ children }) {

    const currentUser = JSON.parse(sessionStorage.getItem('user'))
    const users = JSON.parse(localStorage.getItem('users'))
    
    users.forEach(client => {
        if (client.myemail === currentUser.myemail) {
            history = client.myhistory;
            return
        }
    });

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
                    {history.map((e) => (
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


import React, { useContext, useEffect, useState } from "react";
import { UsersContext } from "../../../../context/UsersContext";
import './Transaction.css';

export default function Transaction({ children }) {

    const {users, setUsers, userInfo, setUserInfo} = useContext(UsersContext);
    const [transaction, setTransaction] = useState([]);
    const currentUser = JSON.parse(sessionStorage.getItem('user'));
    
    useEffect(() => {

        if (users === undefined) return
    
        Array.from(users).forEach(client => {
            if (client.myemail === currentUser.myemail && currentUser.usertype !== 'admin') {
                
                setTransaction(client.myhistory.map((e, index) => (
                    <tr key={index}>
                        <td>{e.date}</td>
                        <td>{e.description}</td>
                        <td>{Number(e.amount).toLocaleString('tl-PH', {style: 'currency', currency: 'PHP',})}</td>
                    </tr>
                )))
            }else {
                setTransaction(userInfo.myhistory.map((e, index) => (
                    <tr key={index}>
                    <td>{e.date}</td>
                    <td>{e.description}</td>
                    <td>{Number(e.amount).toLocaleString('tl-PH', {style: 'currency', currency: 'PHP',})}</td>
                </tr>
                )))
            }
        });    

    },[users])

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
                        {transaction}
                    </tbody>
                </table>
            </div>
        )
}


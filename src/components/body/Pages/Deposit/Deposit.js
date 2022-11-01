import React, { useState, useContext, useEffect } from "react";
import { UsersContext } from '../../../../context/UsersContext';
import './deposit.css'

export default function Deposit(){
    const newDate = new Date()
    const [amount, setAmount] = useState([])
    const [balance, setBalance] = useState([])
    const [users, setUsers] = useContext(UsersContext);
    const user = JSON.parse(sessionStorage.getItem('user'))
    const updateUser = JSON.parse(localStorage.getItem('users'))

    let userBalance;

    useEffect(() => {
        userBalance = updateUser.find(useremail => useremail.myemail == user.myemail)
        setBalance(Number(userBalance.balance) + Number(amount))
    }, [amount])
    
    const onHandleClick = (e) => {
        if (amount === '' || amount.length === 0) return
        updateUser.forEach(users => {
            if (users.myemail === user.myemail) { 
                users.myhistory.push({
                    date: `${newDate.getMonth()+1}-${newDate.getDate()}-${newDate.getFullYear()}`,
                    description: 'deposit',
                    amount: amount
                })
                users.balance = Number(users.balance) + Number(amount);
                console.log('Successfully Deposit')
                localStorage.setItem('users', JSON.stringify(updateUser))
                setUsers(updateUser)
                setAmount('')
                return
            }
        });
    }

    return (
        <div className='pages'>
            {`Hi ${user.firstname} ${user.lastname}, do you want to deposit?`}
            <div className="depositContainer">
                <span>Amount</span>
                <input type='text' maxLength={10} value={amount} onChange={e => setAmount(e.target.value)}></input>
                <p>{balance.toLocaleString('tl-PH', {style: 'currency', currency: 'PHP',})}</p>
                <button onClick={onHandleClick}>Confirm</button> 
            </div>
            
        </div>
    )
}
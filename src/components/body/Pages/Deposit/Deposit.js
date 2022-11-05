import React, { useState, useContext, useEffect } from "react";
import { UsersContext } from '../../../../context/UsersContext';
import './deposit.css'

export default function Deposit(){
    const newDate = new Date()
    const [amount, setAmount] = useState([])
    const [balanceOutput, setBalanceOutput] = useState([])
    const {users, setUsers, userBalance, setUserBalance} = useContext(UsersContext);
    const user = JSON.parse(sessionStorage.getItem('user'))

    let currentUser;

    useEffect(() => {      
        if (users === undefined || users.length === 0) return

        if (users.length !== undefined) {
            currentUser = users.find(client => client.myemail === user.myemail)
            setBalanceOutput(Number(currentUser.balance) + Number(amount))
        }
    }, [amount])
    
    const onHandleClick = (e) => {
        if (amount === '' || amount.length === 0) return
        users.forEach(client => {
            if (client.myemail === user.myemail) { 
                client.myhistory.push({
                    date: `${newDate.getMonth()+1}-${newDate.getDate()}-${newDate.getFullYear()}`,
                    description: 'deposit',
                    amount: amount
                })
                client.balance = Number(client.balance) + Number(amount);
                console.log('Successfully Deposit')
                localStorage.setItem('users', JSON.stringify(users))
                setUsers(users)
                setUserBalance(balanceOutput)
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
                <p>{balanceOutput.toLocaleString('tl-PH', {style: 'currency', currency: 'PHP',})}</p>
                <button onClick={onHandleClick}>Confirm</button> 
            </div>
            
        </div>
    )
}
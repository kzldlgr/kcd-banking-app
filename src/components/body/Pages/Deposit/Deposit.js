import React, { useState } from "react"
import './deposit.css'

export default function Deposit({children}){
    const newDate = new Date()
    const [amount, setAmount] = useState([])
    const user = JSON.parse(sessionStorage.getItem('user'))
    const updateUser = JSON.parse(localStorage.getItem('users'))

    const onHandleClick = (e) => {
        if (amount === '' || amount.length === 0) return
        updateUser.forEach(users => {
            if (users.myemail === user.myemail) { 
                users.myhistory.push({
                    date: `${newDate.getMonth()+1}-${newDate.getDate()}-${newDate.getFullYear()}`,
                    description: 'deposit',
                    amount: amount
                })
                localStorage.setItem('users', JSON.stringify(updateUser))
                return
            }
        });
    }

    return (
        <> 
            <div className='pages'>
                {`Hi ${user.firstname} ${user.lastname}, do you want to deposit?`}
                <div className="depositContainer">
                    <span>Amount</span>
                    <input type='text' maxLength={10} value={amount} onChange={e => setAmount(e.target.value)}></input>
                    <p>Balance: P 285,000.00</p>
                    <button onClick={onHandleClick}>Confirm</button> 
                </div>
                {children}
            </div>
        </>
    )
}
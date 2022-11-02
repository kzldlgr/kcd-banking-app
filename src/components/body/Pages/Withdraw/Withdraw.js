import React, { useState, useEffect, useContext } from "react"
import { UsersContext } from "../../../../context/UsersContext";
import { UserBalanceContext } from "../../../../context/UserBalance";

export default function Withdraw({children}){
    const newDate = new Date()
    const [users, setUsers] = useContext(UsersContext)
    const [userBalance, setUserBalance] = useContext(UserBalanceContext)
    const [amount, setAmount] = useState([])
    const [balanceOutput, setBalanceOutput] = useState([])
    const user = JSON.parse(sessionStorage.getItem('user'))

    let currentUser;

    useEffect(() => {      
        if (users === undefined || users.length === 0) return

        if (users.length !== undefined) {
            currentUser = users.find(client => client.myemail === user.myemail)
            setBalanceOutput(Number(currentUser.balance) - Number(amount))
        }
    }, [amount])

    const onHandleClick = (e) => {
        if (amount === '' || amount.length === 0) return
        users.forEach(client => {
            if (client.myemail === user.myemail) { 
                if (client.balance >= amount) {
                    console.log('Withdraw Successful') 
                    client.myhistory.push({
                        date: `${newDate.getMonth()+1}-${newDate.getDate()}-${newDate.getFullYear()}`,
                        description: 'withdraw',
                        amount: amount,
                    })
                    client.balance -= Number(amount)
                    localStorage.setItem('users', JSON.stringify(users))
                    setUsers(client)
                    setUserBalance(balanceOutput)
                    setAmount('')
                    return
                } return console.log('Not Enough Cash')
            }
        });
    }

    return (
        <> 
            <div className='pages'>
                {`Hi ${user.firstname} ${user.lastname}, do you want to withdraw?`}
                <div className="depositContainer">
                    <span>Amount</span>
                    <input type='text' maxLength={10} value={amount} onChange={e => setAmount(e.target.value)}></input>
                    <p>{balanceOutput.toLocaleString('tl-PH', {style: 'currency', currency: 'PHP',})}</p>
                    <button onClick={onHandleClick}>Confirm</button> 
                </div>
                {children}
            </div>
        </>
    )
}

// --OTP
// --Validation
import React, { useState, useEffect, useContext } from "react"
import { UsersContext } from "../../../../context/UsersContext";

export default function Withdraw({children}){
    const newDate = new Date()
    const {users, setUsers, userBalance, setUserBalance} = useContext(UsersContext)
    const [amount, setAmount] = useState([])
    const [errorMsgs, setErrorMsgs] = useState('')
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
                    setUsers(users)
                    setUserBalance(balanceOutput)
                    setAmount('')
                    return
                } return setErrorMsgs('Not Enough Cash')
            }
        });
    }

    return (
        <> 
            <div className='pages'>
                <div className="depositContainer">
                    <span>Amount</span>
                    <input type='number' maxLength={10} value={amount} onChange={e => setAmount(e.target.value)}></input>
                    <p className='errorMsgs'>{errorMsgs}</p>
                    <p>Balance: {balanceOutput.toLocaleString('tl-PH', {style: 'currency', currency: 'PHP',})}</p>
                    <button onClick={onHandleClick}>Confirm</button> 
                </div>
                {children}
            </div>
        </>
    )
}

// --OTP
// --Validation
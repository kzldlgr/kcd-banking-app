import React, { useState, useEffect, useContext } from "react"
import { UsersContext } from "../../../../context/UsersContext";

export default function Withdraw({children}){
    const newDate = new Date()
    const {users, setUsers, userBalance, setUserBalance, userInfo, setUserInfo} = useContext(UsersContext)
    const [amount, setAmount] = useState([])
    const [errorMsgs, setErrorMsgs] = useState('')
    const [balanceOutput, setBalanceOutput] = useState([])
    const currentUser = JSON.parse(sessionStorage.getItem('user'))

    let newUser;

    useEffect(() => {      
        if (currentUser.usertype === 'admin'){
            if (userInfo !== undefined && userInfo.length !== 0){
                newUser = users.find(client => client.myemail === userInfo.myemail)
                setBalanceOutput(Number(newUser.balance) - Number(amount))    
            }
        }else if(currentUser.usertype === 'user'){
            newUser = users.find(client => client.myemail === currentUser.myemail)
            setBalanceOutput(Number(newUser.balance) - Number(amount))
        }
    }, [amount])

const adminSide = (client) => {
    if (userInfo !== undefined && userInfo.length !== 0) {
        if (client.myemail === userInfo.myemail) { 
            if (client.balance >= amount) {
                console.log('Withdraw Successful') 
                client.myhistory.push({
                    date: `${newDate.getMonth()+1}-${newDate.getDate()}-${newDate.getFullYear()}`,
                    description: 'Withdraw from Bankerost main',
                    amount: amount,
                    category: '',
                    type: 'withdraw'
                })
                client.balance -= Number(amount)
                localStorage.setItem('users', JSON.stringify(users))
                setUsers(users)
                setUserBalance(balanceOutput)
                setAmount('')
                return
            } return setErrorMsgs('Not Enough Cash')
        }
    }
}

const clientSide = (client) => {  
    if (client.myemail === currentUser.myemail) { 
        if (client.balance >= amount) {
            console.log('Withdraw Successful') 
            client.myhistory.push({
                date: `${newDate.getMonth()+1}-${newDate.getDate()}-${newDate.getFullYear()}`,
                description: 'withdraw',
                amount: amount,
                category: '',
                type: 'withdraw'
            })
            client.balance -= Number(amount)
            localStorage.setItem('users', JSON.stringify(users))
            setUsers(users)
            setUserBalance(balanceOutput)
            setAmount('')
            return
        } return setErrorMsgs('Not Enough Cash')
    }
}

    const onHandleClick = (e) => {
        e.preventDefault()
        if (amount === '' || amount.length === 0) return
        
        users.forEach(client => {
            if (currentUser.usertype === 'admin'){
                adminSide(client)
            } else if (currentUser.usertype === 'user'){
                clientSide(client)
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
                    <button>Test</button> 
                </div>
                {children}
            </div>
        </>
    )
}

// --OTP
// --Validation
import React, { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { UsersContext } from '../../../../context/UsersContext';
import './deposit.css'

export default function Deposit(){
    const newDate = new Date()
    const [amount, setAmount] = useState([])
    const [balanceOutput, setBalanceOutput] = useState([])
    const {register, formState: {errors}} = useForm()
    const {users, setUsers, userBalance, setUserBalance, userInfo, setUserInfo} = useContext(UsersContext);
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
            if (client.myemail === user.myemail && client.usertype === 'user') { 
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
            } else {
                userInfo.myhistory.push({
                    date: `${newDate.getMonth()+1}-${newDate.getDate()}-${newDate.getFullYear()}`,
                    description: 'deposit',
                    amount: amount
                })
                userInfo.balance = Number(userInfo.balance) + Number(amount);
                console.log('Successfully Deposit')
                localStorage.setItem('users', JSON.stringify(users))
                setUsers(users)
                setUserBalance(balanceOutput)
                setAmount('')
            }
        });
    }

    return (
        <div className='pages'>
            <form className="depositContainer">
                <span>Amount</span>
                <input type='number' {...register('amount')} maxLength={10} value={amount} onChange={e => setAmount(e.target.value)}></input>
                <p className='errorMsgs'>{errors.amount?.message}</p>
                <p>Balance: {balanceOutput.toLocaleString('tl-PH', {style: 'currency', currency: 'PHP',})}</p>
                <button onClick={onHandleClick}>Confirm</button> 
            </form>        
        </div>
    )
}
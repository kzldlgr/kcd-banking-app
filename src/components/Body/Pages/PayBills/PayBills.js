import React, { useState, useEffect, useContext } from "react";
import { UsersContext } from "../../../../context/UsersContext";

export default function Paybills({children}){
    const newDate = new Date()
    const {users, setUsers, userBalance, setUserBalance, userInfo, setUserInfo} = useContext(UsersContext)
    const [amount, setAmount] = useState([])
    const [biller, setBiller] = useState([])
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
            if (Number(client.balance) >= amount) {
                console.log("Payment to " + biller + " is successful") 
                client.myhistory.push({
                    date: `${newDate.getMonth()+1}-${newDate.getDate()}-${newDate.getFullYear()}`,
                    description: biller + ' Bill Payment from Bankerost main',
                    amount: amount,
                    category: 'UTI',
                    type: 'expense'
                })
                client.balance -= Number(amount)
                setUserBalance(balanceOutput);
                setUsers(users);
                localStorage.setItem('users', JSON.stringify(users))
                return
            } return setErrorMsgs('Not Enough Cash')
        }
    }
}

const clientSide = (client) => {  
    if (client.myemail === currentUser.myemail) { 
        if (Number(client.balance) >= amount) {
            console.log("Payment to " + biller + " is successful") 
            client.myhistory.push({
                date: `${newDate.getMonth()+1}-${newDate.getDate()}-${newDate.getFullYear()}`,
                description: biller + ' Bill Payment',
                amount: amount,
                category: 'UTI',
                type: 'expense'
            })
            client.balance -= Number(amount)
            setUserBalance(balanceOutput);
            setUsers(users);
            localStorage.setItem('users', JSON.stringify(users))
            setUsers(JSON.parse(localStorage.getItem("users")));
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
        setAmount('');
    }

    return (
        
        <div className='p-5 w-full place-content-center font-pop bg-base-100 rounded-md'>
            <div className="w-full flex flex-col">
                <h1 className="font-bold text-lg">Pay Bills</h1>

                <select className="select select-bordered w-full" onChange={(e) => setBiller(e.target.value)}>
                    <option value="Meralco">Electricity - Meralco</option>
                    <option value="Luelco">Electricity - Luelco</option>
                    <option value="Maynilad">Water - Maynilad</option>
                    <option value="Manila Water">Water - Manila Water</option>
                    <option value="Globe">Telcos - Globe</option>
                    <option value="Smart">Telcos - Smart</option>
                </select>

                <span className="font-bold text-lg">Amount</span>
                <input className="input input-bordered" type='number' maxLength={10} value={amount} onChange={e => setAmount(e.target.value)}></input>
                <p className='errorMsgs'>{errorMsgs}</p>
                <p>Balance: {balanceOutput.toLocaleString('tl-PH', {style: 'currency', currency: 'PHP',})}</p>
                
                <button onClick={onHandleClick} className='btn btn-primary self-end mt-3'>Confirm</button> 
            </div>
            {children}
        </div>
        
    )
}
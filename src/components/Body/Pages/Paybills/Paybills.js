import React, { useState, useEffect, useContext } from "react";
import { UsersContext } from "../../../../context/UsersContext";
import { useForm } from "react-hook-form";
import swal from "sweetalert";

export default function Paybills({children}){
    const newDate = new Date()
    const { register, handleSubmit } = useForm()
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

const adminSide = (client, data) => {
    if (userInfo !== undefined && userInfo.length !== 0) {
        if (client.myemail === userInfo.myemail) { 
            if (Number(client.balance) >= amount) {
                client.myhistory.push({
                    date: `${newDate.getMonth()+1}-${newDate.getDate()}-${newDate.getFullYear()}`,
                    description: data.utilities + ' Bill Payment from Bankerost main',
                    amount: amount,
                    category: 'UTI',
                    type: 'expense'
                })
                client.balance -= Number(amount)
                setUserBalance(balanceOutput);
                setUsers(users);
                localStorage.setItem('users', JSON.stringify(users))
                swal({
                    text: "Successfully paid a bill",
                    icon: "success",
                    button: "Done",
                });
                return
            } return setErrorMsgs('Not Enough Cash')
        }
    }
}

const clientSide = (client, data) => {  
    if (client.myemail === currentUser.myemail) { 
        if (Number(client.balance) >= amount) {
            client.myhistory.push({
                date: `${newDate.getMonth()+1}-${newDate.getDate()}-${newDate.getFullYear()}`,
                description: data.utilities + ' Bill Payment',
                amount: amount,
                category: 'UTI',
                type: 'expense'
            })
            client.balance -= Number(amount)
            setUserBalance(balanceOutput);
            setUsers(users);
            localStorage.setItem('users', JSON.stringify(users))
            setUsers(JSON.parse(localStorage.getItem("users")));
            swal({
                text: "Successfully paid a bill",
                icon: "success",
                button: "Done",
            });
            return
        } return setErrorMsgs('Not Enough Cash')
    }
}

    const onSubmit = (data) => {
        if (amount === '' || amount.length === 0) return
        users.forEach(client => {
            if (currentUser.usertype === 'admin'){
                adminSide(client, data)
            } else if (currentUser.usertype === 'user'){
                clientSide(client, data)
            }
        });
        setAmount('');
    }

    return (
        
        <div className='p-5 w-full place-content-center font-pop bg-base-100 rounded-md'>
            <form className="w-full flex flex-col" onSubmit={handleSubmit(onSubmit)}>
                <h1 className="font-bold text-lg">Pay Bills</h1>

                <select {...register('utilities')} className="select select-bordered w-full">
                    <option value="Meralco">Electricity - Meralco</option>
                    <option value="Luelco">Electricity - Luelco</option>
                    <option value="Maynilad">Water - Maynilad</option>
                    <option value="Manila Water">Water - Manila Water</option>
                    <option value="Globe">Telcos - Globe</option>
                    <option value="Smart">Telcos - Smart</option>
                </select>

                <span className="font-bold text-lg">Amount</span>
                <input className="input input-bordered" type='number' maxLength={10} value={amount} onChange={e => setAmount(e.target.value)}/>
                <p className='errorMsgs'>{errorMsgs}</p>
                <p>Balance: {balanceOutput.toLocaleString('tl-PH', {style: 'currency', currency: 'PHP',})}</p>
                
                <button type="submit" className='btn btn-primary self-end mt-3'>Confirm</button> 
            </form>
            {children}
        </div>
        
    )
}
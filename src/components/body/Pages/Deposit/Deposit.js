import React, {useContext, useState} from "react"
import { UsersContext } from "../../../../context/UsersContext"
import './deposit.css'

export default function Deposit({children}){
    const [loggedIn] = useContext(UsersContext)
    const newDate = new Date()
    const [amount, setAmount] = useState([])

    const onHandleClick = (e) => {
        if (amount === '') return
        let deposit = loggedIn.myhistory;
        // deposit.push({})
        console.log(deposit, `${newDate.getMonth()+1}-${newDate.getDate()}-${newDate.getFullYear()}`)
    }

    return (
        <> 
            <div className='pages'>
                {`Hi ${loggedIn.firstname} ${loggedIn.lastname}, do you want to deposit?`}
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
import React, {useContext, useState} from "react"
import { UsersContext } from "../../../../context/UsersContext"
import './deposit.css'

export default function Deposit({children}){
    const [loggedIn, setLoggedIn] = useContext(UsersContext)
    const newDate = new Date()
    const [amount, setAmount] = useState([])
    const [userHistory, setUserHistory] = useState([])

    const onHandleClick = (e) => {
        if (amount === '' || amount.length === 0) return
        let history = loggedIn.myhistory;
        history.push({
            date: `${newDate.getMonth()+1}-${newDate.getDate()}-${newDate.getFullYear()}`,
            description: 'deposit',
            amount: amount
        })
        setUserHistory(history)
        
        console.log(history)


        // setLoggedIn(loggedIn.myhistory = userHistory)
        
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
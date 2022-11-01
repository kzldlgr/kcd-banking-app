import React, { useState, useEffect } from "react"

export default function Withdraw({children}){
    const newDate = new Date()
    const [amount, setAmount] = useState([])
    const [balance, setBalance] = useState([])
    const user = JSON.parse(sessionStorage.getItem('user'))
    const updateUser = JSON.parse(localStorage.getItem('users'))

    let userBalance;

    useEffect(() => {
        userBalance = updateUser.find(useremail => useremail.myemail == user.myemail)
        setBalance(Number(userBalance.balance) - Number(amount))
    }, [amount])

    const onHandleClick = (e) => {

        if (amount === '' || amount.length === 0) return
        updateUser.forEach(users => {
            if (users.myemail === user.myemail) { 
                if (users.balance >= amount) {
                    console.log('Withdraw Successful') 
                    users.myhistory.push({
                        date: `${newDate.getMonth()+1}-${newDate.getDate()}-${newDate.getFullYear()}`,
                        description: 'withdraw',
                        amount: amount,
                    })
                    users.balance -= Number(amount)
                    localStorage.setItem('users', JSON.stringify(updateUser))
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
                    <p>{balance.toLocaleString('tl-PH', {style: 'currency', currency: 'PHP',})}</p>
                    <button onClick={onHandleClick}>Confirm</button> 
                </div>
                {children}
            </div>
        </>
    )
}

// --OTP
// --Validation
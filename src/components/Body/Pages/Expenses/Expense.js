import React, {useEffect, useState, useContext} from 'react';
import { useForm } from 'react-hook-form';
import {UsersContext} from '../../../../context/UsersContext'

export default function Expense() {

    const newDate = new Date();
    const {users, setUsers, userBalance} = useContext(UsersContext);
    const {register, handleSubmit} = useForm();
    const [category, setCategory] = useState([]);
	const [errorMsgs,setErrorMsgs] = useState([]);
    let currentUser = JSON.parse(sessionStorage.getItem('user'))
    const expenseCategory = [
        {
            code: 'HOU',
            desc: 'Housing'},
        {
            code: 'TRA',
            desc: 'Transportation'},
        {
            code: 'FOO',
            desc: 'Food'},
        {
            code: 'UTI',
            desc: 'Utilities'},
        {
            code: 'INS',
            desc: 'Insurance'},
        {
            code: 'MED',
            desc: 'Medical & Healthcare'},
        {
            code: 'SAV',
            desc: 'Savings, Investment & Debt Payments'},
        {
            code: 'PER',
            desc: 'Personal Spending'},
        {
            code: 'REC',
            desc: 'Recreation & Entertainment'},
        {
            code: 'MIS',
            desc: 'Miscellaneous'}
    ]
    
    useEffect(()=>{
       setCategory(expenseCategory.map((cat, index) => (         
        <option key={index} value={cat.code}>{cat.desc}</option>
        )))
    },[])

    const onSubmit = data =>{

        if(data.checksavings && userBalance <= data.amount){
			setErrorMsgs('Insufficient Balance')
		} else {
			users.forEach((user) => {
				if (user.accountnum === currentUser.accountnum) {
					user.balance = data.checksavings ? Number(user.balance) - Number(data.amount) : user.balance
					user.myhistory = [
						...user.myhistory,
						{
							date: `${newDate.getMonth() + 1}-${newDate.getDate()}-${newDate.getFullYear()}`,
							category: data.category,
							amount: data.amount,
							description: data.checksavings ? `${data.description} paid using your savings account` : data.description,
							type: "expense",
						},
					];
				}
			});
			localStorage.setItem("users", JSON.stringify(users));
			setUsers(JSON.parse(localStorage.getItem("users")));
			setErrorMsgs('')
		}
    }
  
    return (
    <div className='pages'>
        <form className='expenseManager' onSubmit={handleSubmit(onSubmit)}>
            
            <div className='expenseInput'>
                <span>Category</span>
                <select {...register('category')}>
                    {category}
                </select>
            </div>
            
            <div className='expenseInput'>
                <span>Amount</span>
                <input type='number' {...register('amount')}/>
            </div>
            
            <div className='expenseInput'>
                <span>Description</span>
                <textarea {...register('description')}/>
            </div>

            <input type='submit' value='Add'/>

        </form>
    </div>
  )
}

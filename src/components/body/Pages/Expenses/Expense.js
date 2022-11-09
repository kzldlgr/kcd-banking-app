import React, {useEffect, useState, useContext} from 'react';
import { useForm } from 'react-hook-form';
import {UsersContext} from '../../../../context/UsersContext'
import './expenses.css'

export default function Expense() {

    const newDate = new Date();
    const {users, setUsers} = useContext(UsersContext);
    const {register, handleSubmit} = useForm();
    const [category, setCategory] = useState([]);
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

        users.forEach(user => {
            if (user.accountnum === currentUser.accountnum){
                user.myhistory = [...user.myhistory, 
                {date: `${newDate.getMonth()+1}-${newDate.getDate()}-${newDate.getFullYear()}`, 
                category: data.category,
                amount: data.amount,
                description: data.description,
                type: 'expense'}]
            }
        });
        localStorage.setItem('users', JSON.stringify(users))
        setUsers(JSON.parse(localStorage.getItem('users')))
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

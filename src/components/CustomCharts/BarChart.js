import React, {useContext, useState, useEffect} from 'react';
import { Bar } from 'react-chartjs-2';
import {Chart as chartjs} from 'chart.js/auto';
import { UsersContext } from '../../context/UsersContext'

export default function BarChart() {

    const loggedUser = JSON.parse(sessionStorage.getItem('user'));
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
    let newHistory,reduced, filtered;

    const {users, setUsers, chartData, setChartData} = useContext(UsersContext)
    

    const loadChart = () => {
        let currentUser = users.find(user => user.myemail === loggedUser.myemail)
        filtered = currentUser.myhistory.filter(data => data.type === 'expense')
        reduced = filtered.reduce((allDates, date)=> {
            
            if (allDates.some(e => {
                return e.Date === date.date
                })) 
            {
                allDates.filter(e => {
                return e.Date === date.date
                })[0].Sales += +Number(date.amount)
            } else {
                allDates.push({
                Date: date.date,
                Sales: +Number(date.amount)
                })
            }
            
            return allDates
        }, []);
    }
    
    useEffect(()=>{
        console.log(users)
        loadChart()
        newHistory = reduced 
        setChartData({
            labels: newHistory.map(data => data.Date),
            datasets: [{
                label: 'Expense',
                data: newHistory.map(data => data.Sales),
                backgroundColor: ['#E97777']
            }]
        })
        return
        
    },[users])
    
  return (
    <Bar data={chartData} />
  )
}

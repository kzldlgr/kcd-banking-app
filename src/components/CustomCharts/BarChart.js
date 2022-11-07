import React, {useContext, useState, useEffect} from 'react';
import { Bar } from 'react-chartjs-2';
import {Chart as chartjs} from 'chart.js/auto';
import { UsersContext } from '../../context/UsersContext'

export default function BarChart() {

    const loggedUser = JSON.parse(sessionStorage.getItem('user'));
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
    const expense = ['232','323','435','600','434','1344',2234];
    const income = ['355','423','235','400','664','1645',3234];
    const expenseCategory = {
        HOU: 'Housing',
        TRA: 'Transportation',
        FOO: 'Food',
        UTI: 'Utilities',
        INS: 'Insurance',
        MED: 'Medical & Healthcare',
        SAV: 'Savings, Investment & Debt Payments',
        PER: 'Personal Spending',
        REC: 'Recreation & Entertainment',
        MIS: 'Miscellaneous'
    }
    let newHistory,reduced, filtered;

    const {users, setUsers} = useContext(UsersContext)
    const [chartData, setChartData] = useState({
            labels: [],
            datasets: [{
                label: 'Activities',
                data: [],
                backgroundColor: ['#E97777']
            }]
        })

    const loadChart = () => {
        let currentUser = users.find(user => user.myemail === loggedUser.myemail)
        filtered = currentUser.myhistory.filter(data => data.type === 'expense')
        reduced = filtered.reduce((allDates, date)=> {
            
            if (allDates.some(e => {
                console.log(allDates)
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
        loadChart()
        newHistory = reduced 
        setChartData({
            labels: newHistory.map(data => data.Date),
            datasets: [{
                label: 'Activities',
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

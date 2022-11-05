import React, {useContext, useState} from 'react';
import { Bar } from 'react-chartjs-2';
import {Chart as chartjs} from 'chart.js/auto';
import { UsersContext } from '../../context/UsersContext'

export default function BarChart() {

    const currentUser = JSON.parse(sessionStorage.getItem('user'));
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
    var sum, total;

    const {users} = useContext(UsersContext)
    const [dateFilter, setDateFilter] = useState([])
    const [totalAmount, setTotalAmount] = useState([])
    // const [chartData, setChartData] = useState({})
        // labels: currentUser.myhistory.map(data => data.date),
        // datasets: [{
        //     label: 'Expense',
        //     data: currentUser.myhistory.reduce((sum,amount) => sum + amount),
        //     backgroundColor: ['#E97777']
        //     }
        // ]
    total = currentUser.myhistory.map(history => history.amount)
    console.log(total.reduce((sum, amount)=> Number(sum) + Number(amount)))

  return (<></>
    // <Bar data={} />
  )
}

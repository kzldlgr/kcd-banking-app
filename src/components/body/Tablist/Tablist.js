import React from 'react';
import Tabs from './tabs/Tabs';
import './tablist.css'

export default function Tablist({userlevel}) {

  if (userlevel !== 'admin'){
    return (
      <div className='tablist'>
        <Tabs text='Transaction' path='./Transaction'/>
        <Tabs text='Deposit' path='./Deposit'/>
        <Tabs text='Withdraw' path='./Withdraw'/>
        <Tabs text='Transfer' path='./Transfer'/>
        <Tabs text='Expenses' path='./Expenses'/>
      </div>
    )
  } else {
    return (
      <div className='tablist'>
        <Tabs text='ManageUser' path='./ManageUser'/>
        <Tabs text='Transaction' path='./Transaction'/>
        <Tabs text='Transfer'path='./Transfer'/>
        <Tabs text='Deposit' path='./Deposit'/>
        <Tabs text='Withdraw' path='./Withdraw'/>
        <Tabs text='Add Client' path='./AddClient'/>
        <Tabs text='Employee' path='./Employee'/>
      </div>
    )
  }
}

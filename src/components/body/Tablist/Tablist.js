import React from 'react';
import Tabs from './tabs/Tabs';
import './tablist.css'

export default function Tablist() {
  return (
    <div className='tablist'>
      <Tabs text='Transaction' path='./Transaction'/>
      <Tabs text='Deposit' path='./Deposit'/>
      <Tabs text='Withdraw' path='./Withdraw'/>
      <Tabs text='Friend List' path='./Friends'/>
      <Tabs text='Expenses' path='./Expenses'/>
    </div>
  )
}

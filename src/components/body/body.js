import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './Sidebar/sidebar';
import Home from './Pages/Home';
import Deposit from './Pages/Deposit';
import Transaction from './Pages/Transaction';
import Withdraw from './Pages/Withdraw';
import './body.css'

export default function body() {

  return (
    <div className='mainbody'>
        <Sidebar/>
        <Routes>
          <Route path='/Home' element={<Home/>}/>
          <Route path='/Transaction' element={<Transaction/>}/>
          <Route path='/Withdraw' element={<Withdraw/>}/>
          <Route path='/Deposit' element={<Deposit/>}/>
        </Routes>
    </div>
  )
}

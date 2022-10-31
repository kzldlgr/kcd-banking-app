import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar/sidebar';
import Dashboard from './Dashboard/dashboard'
import Expenses from './Pages/Expenses/Expenses';
import Tablist from './Tablist/Tablist';

import './body.css'

export default function body() {

  return (
    <div className='mainbody'>
        <Sidebar/>
        <Dashboard>
          <Expenses/>
          <hr className='dashboard_divider'></hr>
          <Tablist/>
          <Outlet/>
        </Dashboard>
    </div>
  )
}

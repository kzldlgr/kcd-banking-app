import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar/sidebar';
import Dashboard from './Dashboard/dashboard'
import Expenses from './Pages/Expenses/Expenseschart';
import Tablist from './Tablist/Tablist';
import Searchpage from './Pages/Searchpage/Search';
import ManageUser from './Pages/ManageUser/ManageUser';

import './body.css'

export default function body() {

  const user = JSON.parse(sessionStorage.getItem('user'));

  if (user.usertype !== 'admin') {
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
  } else {
    return (
      <div className='mainbody'>
        <Sidebar userlevel='admin'/>
        <Dashboard>
        <Tablist userlevel={user.usertype}/>
            <Outlet/>
        </Dashboard>
      </div>
    )
  }
}

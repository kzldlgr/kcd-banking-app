import React, { useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';
import Sidebar from './Sidebar/sidebar';
import Dashboard from './Dashboard/dashboard'
import Expenses from './Pages/Expenses/Expenseschart';
import Tablist from './Tablist/Tablist';
import Searchpage from './Pages/Searchpage/Search';
import { AdminContext } from '../../context/AdminContext';

import './body.css'

export default function Body() {

  const user = JSON.parse(sessionStorage.getItem('user'));
  const { isToggled, setIsToggled } = useContext(AdminContext);



  if (user.usertype !== 'admin') {
    return (
      <div className='mainbody'>
        <Sidebar />
        <Dashboard>
          <Expenses />
          <hr className='dashboard_divider'></hr>
          <Tablist />
          <Outlet />
        </Dashboard>
      </div>
    )
  } else {
    return (
      <div className='mainbody'>
        <Sidebar userlevel='admin' />
        <Dashboard>
          {isToggled && <Searchpage />}
          {!isToggled && <Link onClick={() => setIsToggled(true)} to='/Bankerostmain/Admin' className='optionBtn edit'>Back</Link>}
          {!isToggled && <Tablist userlevel={user.usertype} />}
          {!isToggled && <Outlet />}
        </Dashboard>
      </div>
    )
  }
}

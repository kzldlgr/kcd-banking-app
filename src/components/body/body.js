import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar/sidebar';
import './body.css'

export default function body() {

  return (
    <div className='mainbody'>
        <Sidebar/>
        <Outlet/>
    </div>
  )
}

import React from 'react';
import Navbar from './Navbar/navbar';
import './sidebar.css';

export default function sidebar({children}) {
  return (
    <div className='sidebar'>
        {children}
        <Navbar/>
    </div>
  )
}

import React from 'react';
import Navbar from './Navbar/navbar';
import './sidebar.css';

export default function sidebar({userlevel}) {
  return (
    <div className='sidebar'>
        <Navbar userlevel={userlevel}/>
    </div>
  )
}

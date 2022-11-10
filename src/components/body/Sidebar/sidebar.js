import React from 'react';
import Navbar from './Navbar/navbar';

export default function sidebar({userlevel}) {
  return (
    <div className='sidebar'>
        <Navbar userlevel={userlevel}/>
    </div>
  )
}

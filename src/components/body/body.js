import React from 'react';
import Sidebar from './Sidebar/sidebar';
import './body.css'

export default function body() {
  return (
    <div className='mainbody'>
        <Sidebar/>
      <p>Body</p>
    </div>
  )
}

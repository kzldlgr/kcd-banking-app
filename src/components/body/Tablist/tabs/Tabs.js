import React from 'react'
import { NavLink } from 'react-router-dom'
import './tabs.css'

export default function Tabs({text, path}) {
  return (
    <div>
        <NavLink className='tabs' to={path}>{text}</NavLink>
    </div>
  )
}

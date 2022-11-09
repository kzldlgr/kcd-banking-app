import React from 'react'
import { NavLink } from 'react-router-dom'
import './tabs.css'

export default function Tabs({text, path}) {
  return (
    <NavLink to={path}>
        <button className='tabs'>
            {text}
        </button>
    </NavLink>
  )
}
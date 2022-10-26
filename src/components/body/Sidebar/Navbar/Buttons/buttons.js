import React from 'react'
import './buttons.css'

export default function buttons({children}) {
  return (
    <div className='navbtns'>
      {children}
    </div>
  )
}

import React from 'react';
import { Link } from 'react-router-dom';
import './buttons.css';

export default function Buttons({text, path, onMouseClick, children}) {

  return (
    <Link className='navbtnslink' to={path}>
      <button className='navbtns' onClick={onMouseClick}>
      {text}
      {children}
      </button>
    </Link>
  )
}

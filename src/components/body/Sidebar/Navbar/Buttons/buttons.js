import React, { useState,useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AdminContext } from '../../../../../context/AdminContext';
import './buttons.css';

export default function Buttons({ text, path, onMouseClick, children, image, badgeOn }) {

  const [isBadgeOn, setIsBadgeOn] = useState(false)
  const {userRequest} = useContext(AdminContext)

  useEffect(()=>{
    setIsBadgeOn(badgeOn)
  },[userRequest])

  return (
    <Link className='navbtnslink' to={path}>
      <button className='navbtns' onClick={onMouseClick}>
        {isBadgeOn && userRequest.length !== 0 &&<span className='badge'><span>{userRequest.length}</span></span>}
        <img className='btn-icon' src={image}></img>
        {text}
      </button>
    </Link>
  )
}
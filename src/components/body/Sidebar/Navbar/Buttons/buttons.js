import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import './buttons.css';

export default function Buttons({text, path, onMouseClick, children, image}) {

  // const [imageSrc, setImageSrc] = useState('');

  // useEffect(()=>{
  //   setImageSrc(image)
  // },[])
  
  return (
    <Link className='navbtnslink' to={path}>
      <button className='navbtns' onClick={onMouseClick}>
        <img className='btn-icon' src={image}></img>
        {text}
        {children}
      </button>
    </Link>
  )
}
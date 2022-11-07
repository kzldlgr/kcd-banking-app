import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import editIcon from '../../../../../assets/icons/edit1.png'
import deleteIcon from '../../../../../assets/icons/delete1.png'
import { AdminContext } from '../../../../../context/AdminContext';

export default function Userlist({ userinfo, handleUserClick }) {

  let userBalance = Number(userinfo.balance);
  const {isToggled, setIsToggled} = useContext(AdminContext);

  return (
    <div className='usercontainer' onClick={handleUserClick}>
      <span>{userinfo.accountnum}</span>
      <span>{userinfo.firstname}</span>
      <span>{userinfo.lastname}</span>
      <span>{userinfo.myaddress}</span>
      <span>{userinfo.mymobileno}</span>
      <span>{userBalance.toLocaleString('tl-PH', { style: 'currency', currency: 'PHP', })}</span>
      <span>
        <Link onClick={() => setIsToggled(!isToggled)} to='/Bankerostmain/ManageUser' className='optionBtn edit'><img className="btnIcon" src={editIcon} /></Link>
        <button className='optionBtn delete'><img className="btnIcon" src={deleteIcon} /></button>
      </span>
    </div>
  )
}
import React from 'react'

export default function Userlist({userinfo, handleUserClick}) {

    let userBalance = Number(userinfo.balance);

  return (
    <div className='usercontainer' onClick={handleUserClick}>
      <span>{userinfo.accountnum}</span>
      <span>{userinfo.firstname}</span>
      <span>{userinfo.lastname}</span>
      <span>{userinfo.myaddress}</span>
      <span>{userinfo.mymobileno}</span>
      <span>{userBalance.toLocaleString('tl-PH', {style: 'currency', currency: 'PHP',})}</span>
      <span>
        <button className='optionBtn'></button>
        <button className='optionBtn delete'></button>
      </span>
    </div>
  )
}
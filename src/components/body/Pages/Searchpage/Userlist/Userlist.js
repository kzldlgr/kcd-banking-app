import React from 'react'

export default function Userlist({userinfo, handleUserClick}) {

    let userBalance = Number(userinfo.balance);

  return (
    <tr className='userClicked' onClick={handleUserClick}>
        <td>{userinfo.firstname} {userinfo.lastname}</td>
        <td>{userinfo.myaddress}</td>
        <td>{userBalance.toLocaleString('tl-PH', {style: 'currency', currency: 'PHP',})}</td>
        <td><button>kzl</button></td>

    </tr>
  )
}

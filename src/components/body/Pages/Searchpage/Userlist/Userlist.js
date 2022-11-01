import React from 'react'

export default function Userlist({userinfo, id}) {
  return (
    <tr>
        <td>{userinfo.firstname} {userinfo.lastname}</td>
        <td>{userinfo.myaddress}</td>
        <td>{userinfo.balance}</td>
    </tr>
  )
}

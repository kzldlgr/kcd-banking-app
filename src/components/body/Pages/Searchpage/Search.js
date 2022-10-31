import React from 'react'
import './search.css';

export default function Search() {

    const users = JSON.parse(localStorage.getItem('users'))    
    
    return (
    <div className='searchpage'>
      <div className='searchbar'>
        <span>Search:</span>
        <input className='search_input'></input>
        <button>OK</button>
      </div>
      <div className='userlist'>
        <table>
            <thead>
                <tr>
                    <th>NAME</th>
                    <th>ADDRESS</th>
                    <th>BALANCE</th>
                </tr>
            </thead>

            <tbody>
                {users.map((user, index) => (
                <tr key={index}>
                    <td>{user.firstname} {user.lastname}</td>
                    <td>{user.myaddress}</td>
                    <td>{user.balance}</td>
                </tr>
                ))}
            </tbody>
        </table>
      </div>
    </div>
    )
}

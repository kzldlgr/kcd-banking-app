import React, {useState, useEffect} from 'react'
import Userlist from './Userlist/Userlist';
import './search.css';

export default function Search() {

    const users = JSON.parse(localStorage.getItem('users'));
    const [names, setNames] = useState([]);
    const [inputList, setInputList] = useState([])
    let searchUser;

    useEffect(() => {
      searchUser = users.filter((user) => user.firstname.toLowerCase() === names || user.lastname.toLowerCase() === names)
    }, [names])
    
    const handleClick = (e) => {
      if (searchUser === undefined) return
      
      setInputList(searchUser.map((user, index) => {
        return <Userlist userinfo={user} key={index}/>
      }))
    }

    return (
    <div className='searchpage'>
      <div className='searchbar'>
        <span>Search:</span>
        <input type='text' className='search_input' onChange={e => setNames(e.target.value)}></input>
        <button onClick={handleClick}>OK</button>
      </div>
      <div className='userlist'>
        <div className='userlistview'>
          <table>
              <thead>
                  <tr>
                      <th>NAME</th>
                      <th>ADDRESS</th>
                      <th>BALANCE</th>
                  </tr>
              </thead>

              <tbody>
                {inputList}
                  {/* {users.map((user, index) => (
                  <tr key={index}>
                      <td>{user.firstname} {user.lastname}</td>
                      <td>{user.myaddress}</td>
                      <td>{user.balance}</td>
                  </tr>
                  ))} */}
                  
              </tbody>
          </table>
        </div>
      </div>
    </div>
    )
}

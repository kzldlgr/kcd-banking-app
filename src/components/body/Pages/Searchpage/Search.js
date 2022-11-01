import React, {useState, useEffect} from 'react'
import Userlist from './Userlist/Userlist';
import './search.css';

export default function Search() {

    const users = JSON.parse(localStorage.getItem('users'));
    const [names, setNames] = useState([]);
    const [inputList, setInputList] = useState([])
    let searchUser;

    useEffect(() => {
      let namesToLowerCase = names.toLowerCase()
      searchUser = users.filter((user) => user.firstname.toLowerCase() === namesToLowerCase || 
      user.lastname.toLowerCase() === namesToLowerCase || user.myaddress.toLowerCase() === namesToLowerCase)
      displayUsers()
    }, [names])
    
    const handleUserClick = (e) => {
     console.log('user clicked') 
    }

    // const handleClick = (e) => {
    //   displayUsers()
    // }

    const displayUsers = () => {
      if (searchUser === undefined || searchUser.length === 0) {
        setInputList(users.map((user, index) => {
          return <Userlist userinfo={user} handleUserClick={handleUserClick} key={index}/>
        }))
      } else {
        setInputList(searchUser.map((user, index) => {
          return <Userlist userinfo={user} handleUserClick={handleUserClick} key={index}/>
        }))
      }
    }

    return (
    <div className='searchpage'>
      <div className='searchbar'>
        <span>Search:</span>
        <input type='text' className='search_input' onChange={e => setNames(e.target.value)}></input>
        {/* <button onClick={handleClick}>OK</button> */}
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
              </tbody>
          </table>
        </div>
      </div>
    </div>
    )
}

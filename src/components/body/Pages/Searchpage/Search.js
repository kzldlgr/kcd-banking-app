import React, {useState, useEffect, useContext} from 'react';
import {UsersContext} from '../../../../context/UsersContext';
import {UserBalanceContext} from '../../../../context/UserBalance';
import Userlist from './Userlist/Userlist';
import './search.css';

export default function Search() {

    const [users] = useContext(UsersContext);
    const [userBalance, setUserBalance] = useContext(UserBalanceContext);
    const [names, setNames] = useState([]);
    const [inputList, setInputList] = useState([]);
    let searchUser, selectedUser;

    useEffect(() => {
      let namesToLowerCase = names.toString().toLowerCase()
      searchUser = users.filter((user) => user.firstname.toLowerCase() === namesToLowerCase || 
      user.lastname.toLowerCase() === namesToLowerCase || user.myaddress.toLowerCase() === namesToLowerCase)
      displayUsers()
    }, [names])

    const handleUserClick = (e) => {
      selectedUser = e.target.parentElement.children;
      setUserBalance(selectedUser[2].innerText)
    }

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
      </div>
      <div className='userlist'>
        <div className='userlistview'>
          <table>
              <thead>
                  <tr>
                      <th>NAME</th>
                      <th>ADDRESS</th>
                      <th>BALANCE</th>
                      <th>OPTIONS</th>
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

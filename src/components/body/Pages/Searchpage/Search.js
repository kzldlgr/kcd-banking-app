import React, {useState, useEffect, useContext} from 'react';
import {UsersContext} from '../../../../context/UsersContext';
import Userlist from './Userlist/Userlist';
import './search.css';

export default function Search() {

    const {users, userBalance, setUserBalance} = useContext(UsersContext);
    const [names, setNames] = useState([]);
    const [inputList, setInputList] = useState([]);
    let searchUser, selectedUser;

    useEffect(() => {
      if (users === undefined) return
      let namesToLowerCase = names.toString().toLowerCase()
      searchUser = users.filter(user => user.firstname.toLowerCase() === namesToLowerCase || 
      user.lastname.toLowerCase() === namesToLowerCase || user.myaddress.toLowerCase() === namesToLowerCase)
      displayUsers()
    }, [names])

    const handleUserClick = (e) => {
      selectedUser = e.target.parentElement.children;
      setUserBalance(selectedUser[5].textContent)
      console.log(selectedUser[5].textContent)
    }

    const displayUsers = () => {
      if (searchUser === undefined || searchUser.length === 0) {
        setInputList(users.map((user, index) => {
          if (user.usertype !== 'admin'){
            return <Userlist userinfo={user} handleUserClick={handleUserClick} key={index}/>
          }
        }))
      } else {
        setInputList(searchUser.map((user, index) => {
          if (user.usertype !== 'admin'){
            return <Userlist userinfo={user} handleUserClick={handleUserClick} key={index}/>
          }
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
          <div className='tableHead'>
            <span>Account Number</span><span>First Name</span><span>Last Name</span><span>Address</span><span>Contact</span><span>Balance</span><span>Options</span>
          </div>
          <div className='tableBody'>
            {inputList}
          </div>
        </div>
      </div>
    </div>
    )
}
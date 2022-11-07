import React, { useState, useEffect, useContext } from 'react'
import { AdminContext } from '../../../../context/AdminContext';
import RequestList from './RequestList/RequestList';
import './UserRequest.css'

export default function UserRequest() {

    const [inputList, setInputList] = useState([]);
    const { userRequest, setRequestInfo } = useContext(AdminContext);
    let currentEmail;

    const handleApprove = (e) => {
        currentEmail = e.currentTarget.children[5].textContent;
        let selectedUser = userRequest.find(user => currentEmail === user.myemail)
        setRequestInfo(selectedUser);
    }

    useEffect(() => {
        setInputList(userRequest.map((user, index) => {
            if (user.usertype !== 'admin') {
                return <RequestList userinfo={user} handleApprove={handleApprove} index={index + 1} key={index} />
            }
        }))
    }, [])

    return (

        <div className='userlist'>
            <div className='userlistview'>
                <div className='tableHead'>
                    <span>Request No.</span><span>First Name</span><span>Last Name</span><span>Address</span><span>Contact</span><span>Email</span><span>Options</span>
                </div>
                <div className='tableBody'>
                    {inputList}
                </div>
            </div>
        </div>
    )
}

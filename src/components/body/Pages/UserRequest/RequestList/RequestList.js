import React from 'react'
import { Link } from 'react-router-dom'
import Check from '../../../../../assets/icons/check.png'
import Delete from '../../../../../assets/icons/deleteicon.png'

export default function RequestList({ userinfo, handleApprove, index}) {


    return (
        <div className='usercontainer' onClick={handleApprove}>
            <span>{index}</span>
            <span>{userinfo.firstname}</span>
            <span>{userinfo.lastname}</span>
            <span>{userinfo.myaddress}</span>
            <span>{userinfo.mymobileno}</span>
            <span>{userinfo.myemail}</span>
            <span>

                <Link to='/Bankerostmain/AddClient' className="checkBtn" ><img className="checkIcon" src={Check} /></Link>
                <button className="checkBtn" ><img className="checkIcon" src={Delete} /></button>
            </span>
        </div>
    )
}

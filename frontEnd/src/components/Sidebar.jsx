import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../assets/css/Sidebar.css'
import {FaCubesStacked,FaUser,FaAddressCard,FaRegAddressCard,FaPowerOff} from 'react-icons/fa6'

function Sidebar() {

    return (
        <div className='sidebar'>
            <div className='sidebar-item'>
            <Link to='/dashboard/profile' className='sidebar-link'>
            <FaUser className='icon' />
             Profile</Link>
            </div>
            <div className='sidebar-item'>
            <Link to='/dashboard/contacts' className='sidebar-link'>
            <FaAddressCard className='icon' />
             Contacts</Link>
            </div>
            <div className='sidebar-item'>
            <Link to='/dashboard/add-contact' className='sidebar-link'>
            <FaRegAddressCard className='icon' />
             Add Contacts</Link>
            </div>
            <div className='sidebar-item'>
            <Link to='/logout' className='sidebar-link'>
            <FaPowerOff className='icon' />
             exit</Link>
            </div>
        </div>
    )
}

export default Sidebar
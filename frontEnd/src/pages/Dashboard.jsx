import React from 'react'
import Navbar from '../components/Navbar'
import '../assets/css/Dashboard.css'
import Sidebar from '../components/Sidebar'
import { Outlet } from 'react-router-dom'

function Dashboard() {
    return (
        <>
            <Navbar />
            <div className='dashboard'>
                <div className='sidebar-container'>
                <Sidebar />
                </div>
                <div className='content-container'>
                <Outlet />
                </div>
            </div>
        </>
    )
}

export default Dashboard
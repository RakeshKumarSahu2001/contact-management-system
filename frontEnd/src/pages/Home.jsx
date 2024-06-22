import React from 'react'
import Navbar from '../components/Navbar.jsx'
import '../assets/css/Home.css'

function Home() {
  return (
    <>
    <Navbar />
    <div className='home'>
    <h1 className='home-title'>
        CONTACT MANAGEMENT SYSTEM
    </h1>
    <p className='home-description'>
        Start Collecting your contacts
    </p>
    </div>
    </>
  )
}

export default Home
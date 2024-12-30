import React from 'react'
import Navbar from '../components/Navbar.jsx'
import '../assets/css/Home.css'
import mainImage from "../assets/img/main.jpg"

function Home() {
  return (
    <>
    <Navbar />
    <div className='home' style={{background:`URL(${mainImage})`,backgroundRepeat:"no-repeat",backgroundSize:"cover",backgroundPosition:"center"}}>
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
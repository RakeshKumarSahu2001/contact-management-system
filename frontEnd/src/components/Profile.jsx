import React, { useEffect, useState } from 'react'
import '../assets/css/Profile.css'
import axios from "axios"
import { Link } from 'react-router-dom'

function Profile() {
  const [userInfo,setUserInfo]=useState({})

  useEffect(()=>{
    axios.get("http://localhost:8001/profile",{
      headers:{
        Authorization:`Bearer ${localStorage.getItem("token")}`
      }
    })
    .then((res)=>{
      if(res.data.success){
        setUserInfo({name:res.data.user.name,email:res.data.user.email,id:res.data.user._id})
      }
    })
    .catch((err)=>{
      console.log(err)
    })
  })


  return (
    <>
      <div className='profile-box'>
        <h1>Your Profile</h1>

        <div className='profile-content'>
          <div className='data'><label>Name :</label><span>{userInfo.name}</span></div>
          <div className='data'><label>Email :</label><span>{userInfo.email}</span></div>
          <button><Link to={`/dashboard/edit-profile/${userInfo.id}`}>Edit Profile</Link></button>
        </div>

      </div>
    </>
  )
}

export default Profile
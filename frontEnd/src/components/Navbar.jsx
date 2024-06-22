import React, { createContext, useContext, useState } from 'react'
import '../assets/css/Navbar.css'
import { Link, useNavigate } from 'react-router-dom'
import { userContext } from '../App'
import axios from "axios"

export const searchContext = createContext(null)
function Navbar() {
  const { user } = useContext(userContext)
  const [searchData, setSearchData] = useState("")


  const navigate = useNavigate()
  const handleChange = (e) => {
    setSearchData(e.target.value)
  }

  const handleClick = () => {
    console.log("hello from this side")
    axios.post('http://localhost:8001/search', { searchData }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    }).then((res) => {
      console.log(res.data.results)
      navigate("/dashboard/search", { state: { data: res.data.results } })
    })
      .catch((err) => {
        console.log("Search error :", err)
      })
  }

  return (
    <div className='navbar'>
      <div className='navbar-left'>
        <Link to='/' className='navbar-brand' >Contact us</Link>
      </div>

      <div className='navbar-right'>
        <Link to='/about' className='navbar-link'>About</Link>
        {
          user ? <>
            {/* <searchContext.Provider value={{searchResult, setSearchResult}}> */}
            <div className='searchbar'>
              <input type='text' placeholder='' onChange={handleChange} />
              <button onClick={handleClick}>Search</button>
            </div>
            <Link to='/dashboard' className='navbar-link'>Contact</Link>
            <Link to='/register' className='navbar-link'>{user.name}</Link>
            <Link to='/logout' className='navbar-link'>logout</Link>
            {/* </searchContext.Provider> */}
          </> : <>
            <Link to='/login' className='navbar-link'>Login</Link>
            <Link to='/register' className='navbar-link'>Registen</Link>
          </>
        }


      </div>
    </div>
  )
}

export default Navbar
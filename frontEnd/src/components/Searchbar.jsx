import React, { useState } from 'react'
import axios from "axios"

function Searchbar() {
    const [sercahData,setSearchData]=useState()
    const handleChange=(e)=>{
        setSearchData(e.target.value)
        console.log("sercahData =",sercahData)
    }

    const handleClick=()=>{
        console.log("hello from this side")
    }

    return (
        <>
            <div>
                <input type='text' value="" placeholder='' onChange={handleChange} />
                <button onClick={handleClick}>Search</button>
            </div>
        </>
    )
}

export default Searchbar
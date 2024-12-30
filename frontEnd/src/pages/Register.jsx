import React, { useState } from 'react'
import '../assets/css/Form.css'
import { Link,useNavigate } from 'react-router-dom'
import Validation from '../components/Validation'
import axios from 'axios'
import {toast} from 'react-toastify'
import mainImage from "../assets/img/main.jpg"


function Register() {
    const [values,setValues]=useState({
        name:'',
        email:'',
        password:''
    })
    const [errors,setErrors]=useState({})
    const [serverErrors,setServerErrors]=useState([])
    const navigate=useNavigate()

const handleInput=(e)=>{
    setValues({...values,[e.target.name]:e.target.value})
    // console.log(values)
}

const handleSubmit=(e)=>{
    e.preventDefault()
    const err=Validation(values)
    if(err.name===""&&err.password===""&&err.email===""){
        axios.post('http://localhost:8001/register',values)
        .then((res)=>{
            if(res.data.success){
            toast.success("Account created successfully",{
            position:'top-center',
            autoClose:10000
        })
        navigate('/login')
    }
    })
        .catch((err)=>{
            console.log("axios error :",err)
            if(err.response.data.error){
                setServerErrors(err.response.data.error)
            }
            else{
                console.log(serverErrors)
            }
        })
    }
    setErrors(err)
}

    return (
        <div className='form-container' style={{background:`URL(${mainImage})`,backgroundRepeat:"no-repeat",backgroundSize:"cover",backgroundPosition:"center"}}>
            <form action='' className='form' onSubmit={handleSubmit}>
        <h2>Create Account</h2>

                <div className='form-group'>
                    <label htmlFor='name' className='form-label'>
                        Name :
                    </label>
                    <input
                        type='text'
                        placeholder='Enter name'
                        name='name'
                        className='form-control'
                        onChange={handleInput} />
                </div>

                {
                    errors.name && <span className='error'>{errors.name}</span>
                }

                <div className='form-group'>
                    <label htmlFor='email' className='form-label'>
                        Email :
                    </label>
                    <input
                        type='email'
                        placeholder='Enter email'
                        name='email'
                        className='form-control'
                        onChange={handleInput}
                        autoComplete='off' />
                </div>

                {
                    errors.email && <span className='error'>{errors.email}</span>
                }

                <div className='form-group'>
                    <label htmlFor='password' className='form-label'>
                        Password :
                    </label>
                    <input
                        type='password'
                        placeholder='Enter password'
                        name='password'
                        className='form-control'
                        onChange={handleInput} />
                </div>

                {
                    errors.password && <span className='error'>{errors.password}</span>
                }

                {
                    serverErrors.length>0 && (serverErrors.map((error,index)=>{
                       return <p key={index} className='error'>{error.msg}</p>
                    })
                    )
                }

                <button className='form-btn'>Submit</button>
                <p>Don't have an account<Link to='/login'>Login</Link></p>
            </form>
        </div>
    )
}

export default Register
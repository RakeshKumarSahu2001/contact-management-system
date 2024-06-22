import React, { useState } from 'react'
import '../assets/css/Form.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

function AddContact() {
    const [values, setValues] = useState({
        name: '',
        email: '',
        phone: '',
        address: ''
    })

    const navigate = useNavigate()

    const handleInput = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
        // console.log(values)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        axios.post('http://localhost:8001/addcontact', values, {
            headers: {
                Authorization: `Berear ${localStorage.getItem("token")}`
            }
        })
            .then((res) => {
                console.log(res.data)
                if (res.data.success) {
                    toast.success("Contact Added Successfully", {
                        position: 'top-center',
                        autoClose: 10000
                    })
                    navigate('/dashboard/contacts')
                }
            })
            .catch((err) => {

                console.log(`Add contact error : ${err}`)

            })


    }

    return (
        <div className='form-container'>
            <form action='' className='form' onSubmit={handleSubmit}>
                <h2>Create Contact</h2>

                <div className='form-group'>

                    <input
                        type='text'
                        placeholder='Enter name'
                        name='name'
                        className='form-control'
                        onChange={handleInput} />
                </div>

                <div className='form-group'>

                    <input
                        type='email'
                        placeholder='Enter email'
                        name='email'
                        className='form-control'
                        onChange={handleInput}
                        autoComplete='off' />
                </div>

                <div className='form-group'>

                    <input
                        type='text'
                        placeholder='Enter Phone number'
                        name='phone'
                        className='form-control'
                        onChange={handleInput} />
                </div>

                <div className='form-group'>

                    <input
                        type='text'
                        placeholder='Enter Address'
                        name='address'
                        className='form-control'
                        onChange={handleInput} />
                </div>

                <button className='form-btn'>Submit</button>

            </form>
        </div>
    )
}

export default AddContact
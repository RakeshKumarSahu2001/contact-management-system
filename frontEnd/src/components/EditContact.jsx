import React, { useEffect, useState } from 'react'
import '../assets/css/Form.css'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

function EditContact() {
    const [values, setValues] = useState({
        name: '',
        email: '',
        phone: '',
        address: ''
    })

    const navigate = useNavigate()
    const {id}=useParams()

    const handleInput = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
        // console.log(values)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        axios.put('http://localhost:8001/update-contact/'+id, values, {
            headers: {
                Authorization: `Berear ${localStorage.getItem("token")}`
            }
        })
            .then((res) => {
                if (res.data.success) {
                    toast.success("Contact Updated Successfully", {
                        position: 'top-center',
                        autoClose: 1000
                    })
                    navigate('/dashboard/contacts')
                }
            })
            .catch((err) => {

                console.log(`Add contact error : ${err}`)

            })


    }
    useEffect(() => {
        axios.get('http://localhost:8001/contacts/'+id, {
          headers: {
            Authorization: `Berear ${localStorage.getItem("token")}`
          }
        })
          .then((res) => {
            if (res.data.success) {
              setValues({
                name:res.data.name,
                phone:res.data.phone,
                address:res.data.address,
                email:res.data.email
            })
            }
          })
          .catch((err) => {
            console.log("fatching contacts error :", err)
          })
    
    
      }, [])

    return (
        <div className='form-container'>
            <form action='' className='form' onSubmit={handleSubmit}>
                <h2>Edit Contact</h2>

                <div className='form-group'>

                    <input
                        type='text'
                        placeholder='Enter name'
                        name='name'
                        className='form-control'
                        onChange={handleInput}
                        value={values.name} />
                </div>

                <div className='form-group'>

                    <input
                        type='email'
                        placeholder='Enter email'
                        name='email'
                        className='form-control'
                        onChange={handleInput}
                        autoComplete='off'
                        value={values.email} />
                </div>

                <div className='form-group'>

                    <input
                        type='text'
                        placeholder='Enter Phone number'
                        name='phone'
                        className='form-control'
                        onChange={handleInput}
                        value={values.phone} />
                </div>

                <div className='form-group'>

                    <input
                        type='text'
                        placeholder='Enter Address'
                        name='address'
                        className='form-control'
                        onChange={handleInput}
                        value={values.address} />
                </div>

                <button className='form-btn'>update</button>

            </form>
        </div>
    )
}

export default EditContact
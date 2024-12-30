import React, { useEffect, useState } from 'react'
import '../assets/css/Form.css'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Validation from '../components/Validation'
import axios from 'axios'
import { toast } from 'react-toastify'

function EditProfile() {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: ''
    })
    const [errors, setErrors] = useState({})
    const [serverErrors, setServerErrors] = useState([])
    const navigate = useNavigate()
    const { id } = useParams()

    const handleInput = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
        // console.log(values)
    }


    useEffect(() => {
        axios.get("http://localhost:8001/edit-profile/" + id, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then((res) => {
            if (res.data.success) {
                setValues({ name: res.data.user.name, email: res.data.user.email });
            }
        })
        .catch((err) => {
            console.log(err);
        });
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const err = Validation(values);
        if (!err.name && !err.email) {
            axios.put("http://localhost:8001/update-profile/" + id, values, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            .then((res) => {
                if (res.data.success) {
                    toast.success("User information updated successfully", {
                        position: 'top-center',
                        autoClose: 10000
                    });
                    navigate('/dashboard/profile');
                }
            })
            .catch((err) => {
                if (err.response.data.error) {
                    setServerErrors(err.response.data.error);
                }
            });
        }
        setErrors(err);
    };


    return (
        <div className='form-container'>
            <form action='' className='form' onSubmit={handleSubmit}>
                <h2>Edit Account</h2>

                <div className='form-group'>
                    <label htmlFor='name' className='form-label'>
                        Name :
                    </label>
                    <input
                        type='text'
                        placeholder='Enter name'
                        name='name'
                        value={values.name}
                        className='form-control'
                        contentEditable
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
                        value={values.email}
                        className='form-control'
                        onChange={handleInput}
                        contentEditable
                        autoComplete='off' />
                </div>

                {
                    errors.email && <span className='error'>{errors.email}</span>
                }


                <button className='form-btn'>Submit</button>

            </form>
        </div>
    )
}

export default EditProfile
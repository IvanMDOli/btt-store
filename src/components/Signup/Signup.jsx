import { Field, Form, Formik } from 'formik'
import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './signup.scss'
import { UserContext } from '../../context/UserContext'
import { Icon } from '@iconify/react';

export const Signup = () => {

    const { register } = useContext(UserContext)
    const navigate = useNavigate();

    const handleClose = () => {
        window.scrollTo(0, 0);
        navigate('/');
      };

    const handleSubmit = (e) => {

        register(e)
    }

    return (
        <div className='signup-container'>
            <Icon className='close-button' onClick={handleClose} icon="zondicons:close-outline" width="50" height="50" />
            <div className='signup-div'>
                <h2>Sign Up</h2>
                <Formik
                    initialValues={{
                        name: '',
                        lastname: '',
                        email: '',
                        password: '',
                        logged: false
                    }}
                    onSubmit={handleSubmit}
                    >
                    <Form>
                        <Field className='completename' name='name' type='text' placeholder="Name" />
                        <Field className='completename' name='lastname' type='text' placeholder="Lastname" />
                        <Field name='email' type='email' placeholder="Email" />
                        <Field name='password' type='password' placeholder="Password" />
                        <button type='submit'>Sign Up</button>
                    </Form>
                </Formik>
                <Link to={'/login'}>Login</Link>
            </div>
        </div>
    )
}

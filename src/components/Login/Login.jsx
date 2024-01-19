import { Field, Formik, Form } from 'formik'
import React, { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import { Link, useNavigate } from 'react-router-dom'
import { Icon } from '@iconify/react';
import googleIcon from '/google-icon.png'
import './login.scss'


export const Login = () => {

    const { login, googleLogin } = useContext(UserContext)
    const navigate = useNavigate();

    const handleClose = () => {
        window.scrollTo(0, 0);
        navigate('/');
    };

    const handleSubmit = (e) => {
        login(e)
    }

    return (
        <div className='login-container'>
            <Icon className='close-button' onClick={handleClose} icon="zondicons:close-outline" width="50" height="50" />
            <div className='login-div'>
                <h2>Login</h2>
                <Formik
                    initialValues={{
                        email: '',
                        password: '',
                        logged: false
                    }}
                    onSubmit={handleSubmit}
                    >
                    <Form>
                        <Field id='email' name='email' type='email' placeholder="Email" />
                        <Field id='password' name='password' type='password' placeholder="Password" />
                        <button type='submit'>Login</button>
                    </Form>
                </Formik>
                <p>Login with Google</p>
                <img className='google-icon' onClick={googleLogin} src={googleIcon} alt={googleIcon} />
                <Link to={'/signup'}>Sign Up</Link>
            </div>
        </div>
    )
}

import { Field, Form, Formik } from 'formik'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import './signup.scss'
import { UserContext } from '../../context/UserContext'

export const Signup = () => {

    const { register } = useContext(UserContext)

    const handleSubmit = (e) => {
        console.log("Register", e)

        register(e)
    }

    return (
        <div className='signup-container'>
            <div className='signup-div'>
                <h2>Sign Up</h2>
                <Formik
                    initialValues={{
                        completename: '',
                        email: '',
                        password: '',
                        logged: false
                    }}
                    onSubmit={handleSubmit}
                    >
                    <Form>
                        <Field id='name' name='name' type='text' placeholder="Complete name" />
                        <Field id='email' name='email' type='email' placeholder="Email" />
                        <Field id='password' name='password' type='password' placeholder="Password" />
                        <button type='submit'>Sign Up</button>
                    </Form>
                </Formik>
                <Link to={'/login'}>Login</Link>
            </div>
        </div>
    )
}

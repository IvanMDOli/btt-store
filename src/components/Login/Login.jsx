import { Field, Formik, Form } from 'formik'
import React, { useContext } from 'react'
import './login.scss'
import { UserContext } from '../../context/UserContext'
import { Link } from 'react-router-dom'
import googleIcon from '/google-icon.png'

export const Login = () => {

    const { login, googleLogin } = useContext(UserContext)

    const handleSubmit = (e) => {
        console.log("Submit", e)

        login(e)
    }

    return (
        <div className='login-container'>
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

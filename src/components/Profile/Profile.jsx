import React, { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import './profile.scss'


export const Profile = () => {

  const { user, logout } = useContext(UserContext)

  return (
    <div className='profile-container'>
      <div className='userinfo'>
        <h2>{user.name} {user.lastname}</h2>
        <h3>{user.email}</h3>
      </div>
      <button onClick={logout}>Log out</button>
    </div>
  )
}

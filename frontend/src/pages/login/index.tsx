import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../../common/contexts/AuthContext'

export default function Login() {
  let { loginUser } = useContext(AuthContext)
  return (
    <div>
      <form onSubmit={loginUser}>
        <input type='email' name='email' placeholder='Email' />
        <input type='password' name='password' placeholder='Password' />
        <input type='submit' />
      </form>
      <Link to='/forget-password'>Forget Password</Link>
    </div>
  )
}

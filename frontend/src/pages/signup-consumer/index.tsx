import React, { useContext } from 'react'
import AuthContext from '../../common/contexts/AuthContext'

export default function SignupConsuer() {
  const { signupUser } = useContext(AuthContext)
  return (
    <div>
      <form onSubmit={signupUser}>
        <input type='text' name='username' placeholder='Username' />
        <input type='email' name='email' placeholder='Email' />
        <input type='password' name='password' placeholder='Password' />
        <input type='submit' />
      </form>
    </div>
  )
}

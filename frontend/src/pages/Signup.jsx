import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext'

const Signup = () => {
  let { signupUser } = useContext(AuthContext)
  return (
    <div>
      <form onSubmit={signupUser}>
            <input type="text" name="username" placeholder="Username" />
            <input type="email" name="email" placeholder="Email" />
            <input type="password" name="password" placeholder="Password" />
            <input type="submit" />
        </form>
    </div>
  )
}

export default Signup
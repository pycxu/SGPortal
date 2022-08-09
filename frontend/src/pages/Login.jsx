import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext'

const Login = () => {
    let {loginUser} = useContext(AuthContext)
  return (
    <div>
        <form onSubmit={loginUser}>
            <input type="email" name="email" placeholder="Email" />
            <input type="password" name="password" placeholder="Password" />
            <input type="submit" />
        </form>
    </div>
  )
}

export default Login
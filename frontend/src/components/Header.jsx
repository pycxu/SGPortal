import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Header = () => {
  let {user, logoutUser} = useContext(AuthContext)
  return (
    <div>
        {!user?<Link to="/">Signup</Link>:null}
        <span> | </span>
        {user?<a onClick={logoutUser}>Logout</a>:<Link to="/login">Login</Link>}
        <span> | </span>
        <Link to="/dashboard">Dashboard</Link>

    </div>
  )
}

export default Header
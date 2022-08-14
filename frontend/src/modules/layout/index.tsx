import React, { useContext } from 'react'
import { Link, Outlet } from 'react-router-dom'
import AuthContext from '../../common/contexts/AuthContext'

export default function Layout() {
  const { user, logoutUser } = useContext(AuthContext)
  return (
    <div>
      {!user ? <Link to='/'>Signup</Link> : null}
      <span> | </span>
      {user ? <a onClick={logoutUser}>Logout</a> : <Link to='/login'>Login</Link>}
      <span> | </span>
      <Link to='/dashboard'>Dashboard</Link>

      <Outlet />
    </div>
  )
}

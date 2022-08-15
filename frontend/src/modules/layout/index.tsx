import React, { useContext } from 'react'
import { Link, Outlet } from 'react-router-dom'
import AuthContext from '../../common/contexts/AuthContext'
import { Container } from '@mui/material'
import Header from '../header'

export default function Layout() {
  const { user, logoutUser } = useContext(AuthContext)
  return (
    <div>
      <Header />
      <br />
      <br />
      <br />
      {!user ? <Link to='/'>Signup</Link> : null}
      <span> | </span>
      {user ? <a onClick={logoutUser}>Logout</a> : <Link to='/login'>Login</Link>}
      <span> | </span>
      <Link to='/dashboard'>Dashboard</Link>
      <Container maxWidth={false} sx={{ maxWidth: '395px', mt: '60px' }}>
        <Outlet />
      </Container>
    </div>
  )
}

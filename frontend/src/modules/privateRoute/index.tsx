import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import AuthContext from '../../common/contexts/AuthContext'

export default function PrivateRoute({ redirectPath = '/login', children }) {
  const { user } = useContext(AuthContext)
  console.log('Private route')
  if (!user) {
    return <Navigate to={redirectPath} replace />
  }

  return <>{children}</>
}

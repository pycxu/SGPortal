import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import AuthContext from '../../common/contexts/AuthContext'

type PrivateRouteProps = {
  to?: string
  children: React.ReactNode
}

export default function PrivateRoute({ to = '/login', children }: PrivateRouteProps) {
  const { user } = useContext(AuthContext)
  console.log('Private route')
  if (!user) {
    return <Navigate to={to} replace />
  }

  return <>{children}</>
}

import { useContext } from 'react'
import { Navigate } from 'react-router-dom'

import * as Typography from '../../common/components/typography'
import AuthContext from '../../common/contexts/AuthContext'

export default function index() {
  const { user } = useContext(AuthContext)
  if (user) {
    return <Navigate to='/portal' replace={true} />
  }
  return <Typography.H4>Home Page</Typography.H4>
}

import useAxios from '../../hooks/useAxios'
import { useContext } from 'react'
import { useUserProfile } from '../../hooks/useUserProfile'

import { Stack } from '@mui/material'
import * as Typography from '../../common/components/typography'
import AuthContext from '../../common/contexts/AuthContext'

export default function Portal() {
  const axiosBearer = useAxios()
  const { user, logoutUser } = useContext(AuthContext)

  const onSuccess = (data) => {
    console.log('success', data)
  }
  const onError = (error) => {
    console.log('error1', error)
    logoutUser()
  }

  const { isLoading, data } = useUserProfile(axiosBearer, user.user_id, onSuccess, onError)

  if (isLoading) return <p>Loading...</p>
  return (
    <Stack>
      <Typography.H4>Portal</Typography.H4>
      <Typography.P>Hi {data.username}</Typography.P>
    </Stack>
  )
}
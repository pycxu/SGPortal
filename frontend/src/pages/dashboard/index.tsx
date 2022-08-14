import useAxios from '../../hooks/useAxios'
import { useContext } from 'react'
import { useUserProfile } from '../../hooks/useUserProfile'

import { Stack } from '@mui/material'
import * as Typography from '../../common/components/typography'
import AuthContext from '../../common/contexts/AuthContext'

export default function Dashboard() {
  const axiosBearer = useAxios()
  const { user } = useContext(AuthContext)
  const onSuccess = (data) => {
    console.log('success', data)
  }

  const onError = (data) => {
    console.log('error', data)
  }
  const { isLoading, data, isError, error } = useUserProfile(axiosBearer, user.user_id, onSuccess, onError)

  if (isLoading) return <p>Loading...</p>

  return (
    <Stack>
      <Typography.H4>Dashboard</Typography.H4>
      <Typography.P>Hi {data.username}</Typography.P>
    </Stack>
  )
}

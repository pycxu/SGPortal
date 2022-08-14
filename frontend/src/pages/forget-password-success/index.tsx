import { useNavigate } from 'react-router-dom'

import { Stack, Button } from '@mui/material'
import * as Typography from '../../common/components/typography'

export default function ForgetPasswordSuccess() {
  const navigate = useNavigate()
  return (
    <Stack spacing={3}>
      <Typography.H4>Forget Password</Typography.H4>
      <Typography.P>To reset your passsword, click on the link sent to your email</Typography.P>
      <Button
        onClick={() => navigate('/login', { replace: true })}
        sx={{ backgroundColor: '#00AFC5', width: '100%', py: '10px' }}
      >
        <Typography.P styles={{ color: '#fff', textTransform: 'none' }}>Login Now</Typography.P>
      </Button>
    </Stack>
  )
}
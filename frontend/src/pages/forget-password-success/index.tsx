import { Stack } from '@mui/material'
import { RedirectButton } from '../../common/components'
import * as Typography from '../../common/components/typography'

export default function ForgetPasswordSuccess() {
  return (
    <Stack spacing={3}>
      <Typography.H4>Forget Password</Typography.H4>
      <Typography.P>To reset your passsword, click on the link sent to your email</Typography.P>
      <RedirectButton to='/login'>Login Now</RedirectButton>
    </Stack>
  )
}
import { Stack } from '@mui/material'
import { RedirectButton } from '../../common/components'
import * as Typography from '../../common/components/typography'

export default function SignUpSuccess() {
  return (
    <Stack spacing={3}>
      <Typography.H4>Thank you for signing up!</Typography.H4>
      <Typography.P>To verify your account, click on the link sent to your email</Typography.P>
      <RedirectButton to='/login'>Login Now</RedirectButton>
    </Stack>
  )
}

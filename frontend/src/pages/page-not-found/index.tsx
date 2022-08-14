import { Stack } from '@mui/material'
import { RedirectButton } from '../../common/components'
import * as Typography from '../../common/components/typography'

export default function PageNotFound() {
  return (
    <Stack spacing={3}>
      <Typography.H4>404 Not Found</Typography.H4>
      <RedirectButton to='/'>Home</RedirectButton>
    </Stack>
  )
}

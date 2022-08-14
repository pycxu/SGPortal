import { LoadingButton } from '@mui/lab'
import * as Typography from '../typography'

type FormLoadingButtonProps = {
  children: React.ReactNode
  isLoading: boolean
}

export default function FormLoadingButton({ children, isLoading }: FormLoadingButtonProps) {
  return (
    <LoadingButton
      loading={isLoading}
      type='submit'
      sx={{ backgroundColor: '#00AFC5', width: '100%', py: '10px' }}
    >
      <Typography.P styles={{ color: '#fff', textTransform: 'none' }}>{children}</Typography.P>
    </LoadingButton>
  )
}

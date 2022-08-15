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
      sx={{
        borderRadius: '0',
        backgroundColor: '#00AFC5',
        width: '100%',
        py: '10px',
        '&.MuiButtonBase-root:hover': {
          backgroundColor: '#00AFC5',
          opacity: 0.9,
        },
      }}
    >
      <Typography.P styles={{ color: '#fff', textTransform: 'none', fontSize: '18px' }}>
        {children}
      </Typography.P>
    </LoadingButton>
  )
}

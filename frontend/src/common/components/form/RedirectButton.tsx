import { useNavigate } from 'react-router-dom'

import { Button } from '@mui/material'
import * as Typography from '../typography'

type RedirectButtonProps = {
  to: string
  children: React.ReactNode
}

export default function RedirectButton({ to, children }: RedirectButtonProps) {
  const navigate = useNavigate()
  return (
    <Button
      onClick={() => navigate(to, { replace: true })}
      sx={{ backgroundColor: '#00AFC5', width: '100%', py: '10px' }}
    >
      <Typography.P styles={{ color: '#fff', textTransform: 'none' }}>{children}</Typography.P>
    </Button>
  )
}

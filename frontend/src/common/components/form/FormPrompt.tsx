import { Stack } from '@mui/material'
import { Link } from 'react-router-dom'
import * as Typography from '../typography'

type FormPromptProps = {
  title: string
  action: string
  to: string
}

export default function FormPrompt({ title, action, to }: FormPromptProps) {
  return (
    <Stack direction='row' justifyContent='center' alignItems='center' spacing={1}>
      <Typography.P>{title}</Typography.P>
      <Link to={to}>
        <Typography.P styles={{ color: '#F84283', textDecoration: 'underline' }}>
          {action}
        </Typography.P>
      </Link>
    </Stack>
  )
}

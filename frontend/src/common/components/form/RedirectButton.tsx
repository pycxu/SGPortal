import { Link } from 'react-router-dom'
import * as Clickable from '../clickable'

type RedirectButtonProps = {
  to: string
  children: React.ReactNode
  onClick?: () => void
}

export default function RedirectButton({ to, children, onClick }: RedirectButtonProps) {
  return (
    <Clickable.Text
      variant='text'
      comp={2}
      component={Link}
      to={to}
      style={{ height: '50px', width: '100%' }}
      onClick={onClick}
    >
      {children}
    </Clickable.Text>
  )
}

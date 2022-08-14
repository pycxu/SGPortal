import { useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import AuthContext from '../../common/contexts/AuthContext'
import * as Typography from '../../common/components/typography'

export default function VerifyEmail() {
  const { verifyEmail } = useContext(AuthContext)
  const { uidb64, token } = useParams()
  const navigate = useNavigate()
  const { mutate: verify, isLoading } = useMutation((userData) => verifyEmail(userData), {
    onSuccess: () => {
      setTimeout(() => {
        navigate('/login')
      }, 2000)
    },
    onError: (error) => {
      console.log('verify email error ', error)
    },
  })

  useEffect(() => {
    const userData = {
      uidb64,
      token,
    }
    verify(userData)
  }, [])
  if (isLoading) return <Typography.P>Loading...</Typography.P>

  return <Typography.H4>Verified! Redirecting to login page...</Typography.H4>
}

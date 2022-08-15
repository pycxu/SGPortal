import { useContext } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useForm, FormProvider } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import AuthContext from '../../common/contexts/AuthContext'

import { Stack } from '@mui/material'
import {
  FormTextFieldInput,
  FormServerErrorHelperText,
  FormLoadingButton,
} from '../../common/components'
import * as yup from 'yup'
import * as Typography from '../../common/components/typography'

export default function ResetPassword() {
  const { resetPassword } = useContext(AuthContext)
  const { uidb64, token } = useParams()
  const navigate = useNavigate()

  const schema = yup.object().shape({
    password: yup.string().required('Password is required'),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
  })

  const methods = useForm({ mode: 'onBlur', resolver: yupResolver(schema) })

  const { mutate: reset, isLoading } = useMutation((userData) => resetPassword(userData), {
    onSuccess: () => {
      navigate('/login', { replace: true })
    },
    onError: (error) => {
      methods.setError('server', { type: 'server', message: error.response.data.error })
      setTimeout(() => {
        navigate('/', { replace: true })
      }, 2000)
    },
  })

  const onSubmit = (userData) => {
    userData.uidb64 = uidb64
    userData.token = token
    reset(userData)
  }

  return (
    <Stack spacing={3}>
      <Typography.H3 comp='survey'>Reset Password</Typography.H3>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <FormTextFieldInput name='password' type='password' label='Password' />
          <FormTextFieldInput name='confirmPassword' type='password' label='Confirm Password' />
          <FormServerErrorHelperText />
          <FormLoadingButton isLoading={isLoading}>Reset Password</FormLoadingButton>
        </form>
      </FormProvider>
    </Stack>
  )
}

import { useContext } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useForm, FormProvider } from 'react-hook-form'
import { useNavigate, Link } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import AuthContext from '../../common/contexts/AuthContext'

import { Stack, CircularProgress } from '@mui/material'
import {
  FormTextFieldInput,
  FormServerErrorHelperText,
  FormLoadingButton,
  FormPrompt,
} from '../../common/components'
import * as yup from 'yup'
import * as Clickable from '../../common/components/clickable'
import * as Typography from '../../common/components/typography'

export default function SignupConsuer() {
  const { signupConsumer } = useContext(AuthContext)
  const navigate = useNavigate()

  const schema = yup.object().shape({
    username: yup
      .string()
      .required('Username is required')
      .min(4, 'Username must be at least 4 characters long'),
    email: yup.string().email().required('Email is required'),
    password: yup.string().required('Password is required'),
  })
  const methods = useForm({ mode: 'onBlur', resolver: yupResolver(schema) })

  const { mutate: register, isLoading } = useMutation((userData) => signupConsumer(userData), {
    onSuccess: () => {
      navigate('/signup-success', { replace: true })
    },
    onError: (error) => {
      if (error.response.status === 409) {
        methods.setError('server', { type: 'server', message: error.response.data.error })
      } else if (error.response.status === 422) {
        navigate('/signup-success', { replace: true })
      }
    },
  })

  const onSubmit = (userData) => {
    register(userData)
  }
  return (
    <Stack spacing={3}>
      <Typography.H3 comp='survey'>Sign Up</Typography.H3>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <FormTextFieldInput name='username' type='text' label='Username' />
          <FormTextFieldInput name='email' type='email' label='Email' />
          <FormTextFieldInput name='password' type='password' label='Password' />
          <FormServerErrorHelperText />
          <FormLoadingButton isLoading={isLoading}>Sign Up</FormLoadingButton>
        </form>
      </FormProvider>
      <FormPrompt title='Already registered?' action='Login now!' to='/login' />
    </Stack>
  )
}

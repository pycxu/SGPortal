import { useContext } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useForm, FormProvider } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import AuthContext from '../../common/contexts/AuthContext'

import { Stack } from '@mui/material'
import {
  FormTextFieldInput,
  FormServerErrorHelperText,
  FormLoadingButton,
  FormPrompt,
} from '../../common/components'
import * as yup from 'yup'
import * as Typography from '../../common/components/typography'

export default function Login() {
  const { loginUser, storedAuthTokens } = useContext(AuthContext)
  const navigate = useNavigate()

  const schema = yup.object().shape({
    email: yup.string().email().required('Email is required'),
    password: yup.string().required('Password is required'),
  })
  const methods = useForm({ mode: 'onBlur', resolver: yupResolver(schema) })

  const { mutate: login, isLoading } = useMutation((userData) => loginUser(userData), {
    onSuccess: (data) => {
      storedAuthTokens(data)
      navigate('/dashboard', { replace: true })
    },
    onError: (error) => {
      methods.setError('server', { type: 'server', message: error.response.data.error })
    },
  })

  const onSubmit = (userData) => {
    login(userData)
  }
  return (
    <Stack spacing={3}>
      <Typography.H3 comp='survey'>Log In</Typography.H3>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <FormTextFieldInput name='email' type='email' label='Email' />
          <FormTextFieldInput name='password' type='password' label='Password' />
          <FormServerErrorHelperText />
          <FormLoadingButton isLoading={isLoading}>Log In</FormLoadingButton>
        </form>
      </FormProvider>
      <FormPrompt title='Forget your password?' action='Reset now!' to='/forget-password' />
    </Stack>
  )
}

import { useContext } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useForm, FormProvider } from 'react-hook-form'
import { useNavigate, Link } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import AuthContext from '../../common/contexts/AuthContext'

import { Stack, FormHelperText, Alert } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import FormTextFieldInput from '../../common/components/form/FormTextFieldInput'
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

  const {
    mutate: login,
    data,
    isLoading,
  } = useMutation((userData) => loginUser(userData), {
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
    <Stack>
      <Typography.H3>Log In</Typography.H3>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <FormTextFieldInput name='email' type='email' label='Email' />
          <FormTextFieldInput name='password' type='password' label='Password' />
          {methods.formState.errors.server ? (
            <FormHelperText
              component={'div'}
              error={!!methods.formState.errors.server}
              sx={{ mb: 2 }}
            >
              <Alert severity='error'>{methods.formState.errors.server?.message}</Alert>
            </FormHelperText>
          ) : (
            ''
          )}
          <LoadingButton
            loading={isLoading}
            type='submit'
            sx={{ backgroundColor: '#00AFC5', width: '100%', py: '10px' }}
          >
            <Typography.P styles={{ color: '#fff', textTransform: 'none' }}>Log In</Typography.P>
          </LoadingButton>
        </form>
      </FormProvider>

      <Stack direction='row' justifyContent='center' alignItems='center' spacing={1}>
        <Typography.P>Forget your password?</Typography.P>
        <Link to='/forget-password'>
          <Typography.P styles={{ color: '#F84283', testDecoration: 'underline' }}>
            Reset now!
          </Typography.P>
        </Link>
      </Stack>
    </Stack>
  )
}

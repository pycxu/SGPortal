import { useContext, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useForm, Controller } from 'react-hook-form'
import { useNavigate, Link } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import AuthContext from '../../common/contexts/AuthContext'

import { TextField, Stack, FormHelperText, Alert } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import * as yup from 'yup'
import * as Typography from '../../common/components/typography'

export default function Login() {
  const { loginUser, storedAuthTokens } = useContext(AuthContext)
  const navigate = useNavigate()

  const schema = yup.object().shape({
    email: yup.string().email().required('Email is required'),
    password: yup.string().required('Password is required'),
  })
  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({ mode: 'onBlur', resolver: yupResolver(schema) })

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
      setError('server', { type: 'server', message: error.response.data.error })
    },
  })

  const onSubmit = (userData) => {
    login(userData)
  }
  return (
    <Stack>
      <Typography.H3>Log In</Typography.H3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name='email'
          control={control}
          defaultValue=''
          render={({ field }) => (
            <TextField
              {...field}
              sx={{ mb: 2 }}
              onFocus={() => clearErrors('server')}
              type='email'
              label='Email'
              variant='filled'
              error={!!errors.email}
              helperText={errors.email ? errors.email?.message : ''}
              fullWidth
            />
          )}
        />
        <br />
        <Controller
          name='password'
          control={control}
          defaultValue=''
          render={({ field }) => (
            <TextField
              {...field}
              sx={{ mb: 2 }}
              onFocus={() => clearErrors('server')}
              type='password'
              label='Password'
              variant='filled'
              error={!!errors.password}
              helperText={errors.password ? errors.password?.message : ''}
              fullWidth
            />
          )}
        />
        <FormHelperText error={!!errors.server} sx={{ mb: 2 }}>
          {errors.server ? <Alert severity='error'>{errors.server?.message}</Alert> : ''}
        </FormHelperText>
        <LoadingButton
          loading={isLoading}
          type='submit'
          sx={{ backgroundColor: '#00AFC5', width: '100%', py: '10px' }}
        >
          <Typography.P styles={{ color: '#fff', textTransform: 'none' }}>Log In</Typography.P>
        </LoadingButton>
      </form>
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

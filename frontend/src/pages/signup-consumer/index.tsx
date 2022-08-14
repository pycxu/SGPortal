import React, { useContext } from 'react'
import AuthContext from '../../common/contexts/AuthContext'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { TextField, Stack } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import * as Typography from '../../common/components/typography'

export default function SignupConsuer() {
  const { signupUser } = useContext(AuthContext)
  const schema = yup.object().shape({
    username: yup
      .string()
      .required('Username is required')
      .min(6, 'Username must be at least 6 characters long'),
    email: yup.string().email().required('Email is required'),
    password: yup.string().required('Password is required'),
  })
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onBlur', resolver: yupResolver(schema) })

  return (
    <Stack>
      <Typography.H3>Sign Up</Typography.H3>
      <form onSubmit={handleSubmit(signupUser)}>
        <Controller
          name='username'
          control={control}
          defaultValue=''
          render={({ field }) => (
            <TextField
              {...field}
              sx={{ mb: 2 }}
              type='text'
              label='Username'
              variant='filled'
              error={!!errors.username}
              helperText={errors.username ? errors.username?.message : ''}
              fullWidth
            />
          )}
        />
        <br />
        <Controller
          name='email'
          control={control}
          defaultValue=''
          render={({ field }) => (
            <TextField
              {...field}
              sx={{ mb: 2 }}
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
              type='password'
              label='Password'
              variant='filled'
              error={!!errors.password}
              helperText={errors.password ? errors.password?.message : ''}
              fullWidth
            />
          )}
        />
        <LoadingButton type='submit' sx={{ backgroundColor: '#00AFC5', width: '100%', py: '10px'}}>
          <Typography.P styles={{ color: '#fff', textTransform: 'none' }}>Sign Up</Typography.P>
        </LoadingButton>
      </form>
    </Stack>
  )
}

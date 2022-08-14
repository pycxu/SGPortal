import { useContext } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useForm, Controller } from 'react-hook-form'
import { useNavigate, Link } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import AuthContext from '../../common/contexts/AuthContext'

import { TextField, Stack } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import * as yup from 'yup'
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
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ mode: 'onBlur', resolver: yupResolver(schema) })

  const { mutate: register, isLoading } = useMutation((userData) => signupConsumer(userData), {
    onSuccess: () => {
      navigate('/signup-success', { replace: true })
    },
    onError: (error) => {
      if (error.response.status === 409) {
        setError(error.response.data.id, { type: 'server', message: error.response.data.error })
      } else if (error.response.status === 422) {
        navigate('/signup-success', { replace: true })
      }
    },
  })

  const onSubmit = (userData) => {
    register(userData)
  }
  return (
    <Stack>
      <Typography.H3>Sign Up</Typography.H3>
      <form onSubmit={handleSubmit(onSubmit)}>
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
        <LoadingButton
          loading={isLoading}
          type='submit'
          sx={{ backgroundColor: '#00AFC5', width: '100%', py: '10px' }}
        >
          <Typography.P styles={{ color: '#fff', textTransform: 'none' }}>Sign Up</Typography.P>
        </LoadingButton>
      </form>
      <Stack direction='row' justifyContent='center' alignItems='center' spacing={1}>
        <Typography.P>Already registered?</Typography.P>
        <Link to='/login'>
          <Typography.P styles={{ color: '#F84283', testDecoration: 'underline' }}>
            Login now!
          </Typography.P>
        </Link>
      </Stack>
    </Stack>
  )
}

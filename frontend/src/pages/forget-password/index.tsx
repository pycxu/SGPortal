import { useContext } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useForm, Controller } from 'react-hook-form'
import { useNavigate, Link } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import AuthContext from '../../common/contexts/AuthContext'

import { TextField, Stack, FormHelperText, Alert } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import * as yup from 'yup'
import * as Typography from '../../common/components/typography'

export default function ForgetPassword() {
  const { forgetPassword } = useContext(AuthContext)
  const navigate = useNavigate()

  const schema = yup.object().shape({
    email: yup.string().email().required('Email is required'),
  })
  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({ mode: 'onBlur', resolver: yupResolver(schema) })

  const { mutate: forget, isLoading } = useMutation((userData) => forgetPassword(userData), {
    onSuccess: () => {
      navigate('/forget-password-success', { replace: true })
    },
    onError: (error) => {
      setError('server', { type: 'server', message: error.response.data.error })
    },
  })

  const onSubmit = (userData) => {
    forget(userData)
  }

  return (
    <Stack>
      <Typography.H4>Forget Password</Typography.H4>
      <Typography.P>
        Tell us your email address, we will send you a link to reset your password
      </Typography.P>
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
        <FormHelperText error={!!errors.server} sx={{ mb: 2 }}>
          {errors.server ? <Alert severity='error'>{errors.server?.message}</Alert> : ''}
        </FormHelperText>
        <LoadingButton
          loading={isLoading}
          type='submit'
          sx={{ backgroundColor: '#00AFC5', width: '100%', py: '10px' }}
        >
          <Typography.P styles={{ color: '#fff', textTransform: 'none' }}>Sent Link</Typography.P>
        </LoadingButton>
      </form>
    </Stack>
  )
}

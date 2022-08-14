import { useContext } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useForm, Controller } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import AuthContext from '../../common/contexts/AuthContext'

import { TextField, Stack, FormHelperText, Alert } from '@mui/material'
import { LoadingButton } from '@mui/lab'
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

  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({ mode: 'onBlur', resolver: yupResolver(schema) })

  const { mutate: reset, isLoading } = useMutation((userData) => resetPassword(userData), {
    onSuccess: () => {
      navigate('/login', { replace: true })
    },
    onError: (error) => {
      setError('server', { type: 'server', message: error.response.data.error })
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
    <Stack>
      <Typography.H4>Reset Password</Typography.H4>
      <form onSubmit={handleSubmit(onSubmit)}>
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
              label='New Password'
              variant='filled'
              error={!!errors.password}
              helperText={errors.password ? errors.password?.message : ''}
              fullWidth
            />
          )}
        />
        <Controller
          name='confirmPassword'
          control={control}
          defaultValue=''
          render={({ field }) => (
            <TextField
              {...field}
              sx={{ mb: 2 }}
              onFocus={() => clearErrors('server')}
              type='password'
              label='Confirm New Password'
              variant='filled'
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword ? errors.confirmPassword?.message : ''}
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
          <Typography.P styles={{ color: '#fff', textTransform: 'none' }}>
            Reset Password
          </Typography.P>
        </LoadingButton>
      </form>
    </Stack>
  )
}

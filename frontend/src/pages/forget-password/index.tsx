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
} from '../../common/components'
import * as yup from 'yup'
import * as Typography from '../../common/components/typography'

export default function ForgetPassword() {
  const { forgetPassword } = useContext(AuthContext)
  const navigate = useNavigate()

  const schema = yup.object().shape({
    email: yup.string().email().required('Email is required'),
  })
  const methods = useForm({ mode: 'onBlur', resolver: yupResolver(schema) })

  const { mutate: forget, isLoading } = useMutation((userData) => forgetPassword(userData), {
    onSuccess: () => {
      navigate('/forget-password-success', { replace: true })
    },
    onError: (error) => {
      methods.setError('server', { type: 'server', message: error.response.data.error })
    },
  })

  const onSubmit = (userData) => {
    forget(userData)
  }

  return (
    <Stack spacing={3}>
      <Typography.H3 comp='survey'>Forget Password</Typography.H3>
      <Typography.P>
        Tell us your email address, we will send you a link to reset your password
      </Typography.P>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <FormTextFieldInput name='email' type='email' label='Email' />
          <FormServerErrorHelperText />
          <FormLoadingButton isLoading={isLoading}>Sent Link</FormLoadingButton>
        </form>
      </FormProvider>
    </Stack>
  )
}

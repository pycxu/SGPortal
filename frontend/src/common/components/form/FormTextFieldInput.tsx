import { Controller, useFormContext } from 'react-hook-form'
import { TextField, InputProps } from '@mui/material'

type FormInputProps = {
  name: string
  label: string
} & InputProps

export default function FormTextFieldInput({ name, label, ...otherProps }: FormInputProps) {
  const {
    control,
    formState: { errors },
    clearErrors,
  } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=''
      render={({ field }) => (
        <TextField
          {...field}
          sx={{ mb: 2 }}
          label={label}
          onFocus={() => clearErrors('server')}
          variant='filled'
          error={!!errors[name]}
          helperText={errors[name] ? errors[name]?.message : ''}
          fullWidth
          {...otherProps}
        />
      )}
    />
  )
}

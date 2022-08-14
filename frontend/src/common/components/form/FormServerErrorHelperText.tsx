import { useFormContext } from 'react-hook-form'

import { FormHelperText, Alert } from '@mui/material'

export default function FormServerErrorHelperText() {
  const {
    formState: { errors },
  } = useFormContext()
  return (
    <>
      {errors.server ? (
        <FormHelperText component={'div'} error={!!errors.server} sx={{ mb: 2 }}>
          <Alert severity='error'>{errors.server?.message}</Alert>
        </FormHelperText>
      ) : (
        ''
      )}
    </>
  )
}

import { TextField, TextFieldProps } from '@mui/material'

export interface CustomInputProps extends Omit<TextFieldProps, 'variant'> {
  error?: boolean
  helperText?: string
}

export const Input = ({ error, helperText, ...props }: CustomInputProps) => {
  return (
    <TextField
      variant="outlined"
      fullWidth
      error={error}
      helperText={helperText}
      {...props}
      sx={{
        '& .MuiOutlinedInput-root': {
          backgroundColor: 'background.paper',
          borderRadius: '8px',
          '& fieldset': {
            borderColor: 'rgba(255, 255, 255, 0.23)',
          },
          '&:hover fieldset': {
            borderColor: 'primary.main',
          },
          '&.Mui-focused fieldset': {
            borderColor: 'primary.main',
          }
        },
        '& .MuiInputLabel-root': {
          color: 'text.secondary',
          '&.Mui-focused': {
            color: 'primary.main',
          }
        },
        '& .MuiInputBase-input': {
          color: 'text.primary',
        }
      }}
    />
  )
} 
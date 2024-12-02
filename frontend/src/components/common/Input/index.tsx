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
          backgroundColor: 'white',
          borderRadius: '8px',
          '& fieldset': {
            borderColor: 'rgba(0, 0, 0, 0.23)',
          },
          '&:hover fieldset': {
            borderColor: '#000',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#000',
          }
        },
        '& .MuiInputLabel-root': {
          color: 'rgba(0, 0, 0, 0.6)',
          '&.Mui-focused': {
            color: '#000',
          }
        },
        '& .MuiInputBase-input': {
          color: '#000',
        }
      }}
    />
  )
} 
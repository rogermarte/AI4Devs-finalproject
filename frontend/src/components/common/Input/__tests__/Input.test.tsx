import { render, screen } from '@testing-library/react'
import { Input } from '../index'
import { ComponentType } from 'react'

interface MockTextFieldProps {
  label?: string
  helperText?: string
  id?: string
  sx?: Record<string, unknown>
  error?: boolean
}

jest.mock('@mui/material', () => ({
  TextField: ({ label, helperText, id = 'test-input', sx, error }: MockTextFieldProps) => (
    <div data-testid="text-field" data-sx={JSON.stringify(sx)} data-error={error}>
      <label htmlFor={id}>{label}</label>
      <input id={id} aria-label={label} />
      {helperText && <span>{helperText}</span>}
    </div>
  )
}))

jest.mock('@mui/material/styles', () => ({
  styled: (Component: ComponentType) => Component,
  useTheme: () => ({
    palette: {
      mode: 'light',
      primary: { main: '#000' },
      background: { paper: '#fff' },
      text: { primary: '#000', secondary: '#666' }
    }
  })
}))

describe('Input Component', () => {
  const setup = (props = {}) => {
    return render(<Input {...props} />)
  }

  it('renders correctly', () => {
    setup({ label: 'Test Input' })
    expect(screen.getByLabelText('Test Input')).toBeInTheDocument()
  })

  it('shows error state correctly', () => {
    setup({ 
      label: 'Test Input',
      error: true,
      helperText: 'Error message'
    })
    expect(screen.getByText('Error message')).toBeInTheDocument()
  })
}) 
import { render, screen, fireEvent } from '@testing-library/react'
import { PropertyCard } from '../PropertyCard'
import { PropertyStatus } from '@/types'

const mockProperty = {
  id: '1',
  title: 'Test Property',
  price: 350000,
  squareMeters: 100,
  status: PropertyStatus.PUBLISHED,
  psi: {
    id: '1',
    email: 'psi@test.com',
    profile: {
      id: '1',
      name: 'Test PSI',
      type: 'PSI'
    }
  }
}

describe('PropertyCard', () => {
  it('renderiza la información de la propiedad', () => {
    render(<PropertyCard property={mockProperty} onInvestmentComplete={() => {}} />)
    expect(screen.getByText('Test Property')).toBeInTheDocument()
    expect(screen.getByText('€350.000')).toBeInTheDocument()
    expect(screen.getByText('100m²')).toBeInTheDocument()
  })

  it('muestra el modal al hacer click en Invertir', () => {
    render(<PropertyCard property={mockProperty} onInvestmentComplete={() => {}} />)
    fireEvent.click(screen.getByText('Invertir'))
    expect(screen.getByText(`Invertir en ${mockProperty.title}`)).toBeInTheDocument()
  })
}) 
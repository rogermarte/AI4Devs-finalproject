import { render, screen, waitFor } from '@testing-library/react'
import { InvestmentsList } from '../InvestmentsList'
import { InvestmentStatus } from '@/types/enums'

const mockInvestments = [
  {
    id: '1',
    propertyId: '1',
    amount: 350000,
    status: InvestmentStatus.INTERESTED,
    createdAt: '2024-03-15T10:00:00Z',
    property: {
      title: 'Test Property',
      price: 350000,
      squareMeters: 100,
      psi: {
        profile: {
          name: 'Test PSI'
        }
      }
    },
    investor: {
      profile: {
        name: 'Test Investor'
      }
    }
  }
]

describe('InvestmentsList', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockInvestments)
      })
    ) as jest.Mock
  })

  it('renderiza la lista de inversiones', async () => {
    render(<InvestmentsList />)
    
    expect(screen.getByText('Cargando inversiones...')).toBeInTheDocument()
    
    await waitFor(() => {
      expect(screen.getByText('Test Property')).toBeInTheDocument()
      expect(screen.getByText('€350.000')).toBeInTheDocument()
      expect(screen.getByText('Estado: INTERESTED')).toBeInTheDocument()
    })
  })
}) 
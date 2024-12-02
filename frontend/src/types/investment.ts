export interface Investment {
  id: string
  propertyId: string
  amount: number
  status: 'PENDING' | 'APPROVED' | 'REJECTED'
  createdAt: string
  property: {
    title: string
    price: number
    squareMeters: number
    psi: {
      profile: {
        name: string
      }
    }
  }
  investor: {
    profile: {
      name: string
    }
  }
} 
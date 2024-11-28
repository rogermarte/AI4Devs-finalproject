interface Property {
    id: string
    title: string
    price: number
    squareMeters: number
    psi: {
      profile: {
        name: string
      }
    }
  }
  
  interface Investment {
    id: string
    amount: number
    status: string
    property: Property
  }
  
  export type { Property, Investment }
import { PropertyStatus } from './enums'
import { User } from './user'

export interface Property {
  id: string
  title: string
  price: number
  squareMeters: number
  status: PropertyStatus
  psi: User
} 
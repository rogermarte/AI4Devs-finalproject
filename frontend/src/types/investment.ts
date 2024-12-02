import { InvestmentStatus } from './enums'
import { Property } from './property'
import { User } from './user'

export interface Investment {
  id: string
  amount: number
  status: InvestmentStatus
  property: Property
  investor: User
  createdAt: string
} 
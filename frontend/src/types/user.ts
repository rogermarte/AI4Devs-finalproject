import { UserType } from './enums'

export interface UserProfile {
  id: string
  name: string
  type: UserType
  phone?: string
}

export interface User {
  id: string
  email: string
  profile: UserProfile
} 
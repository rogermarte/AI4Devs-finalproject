export enum UserType {
  PSI = 'PSI',
  INVESTOR = 'INVESTOR'
}

export enum PropertyStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  RESERVED = 'RESERVED',
  SOLD = 'SOLD'
}

export enum InvestmentStatus {
  INTERESTED = 'INTERESTED',
  IN_PROCESS = 'IN_PROCESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export const statusLabels = {
  [InvestmentStatus.INTERESTED]: 'Interesado',
  [InvestmentStatus.IN_PROCESS]: 'En Proceso',
  [InvestmentStatus.COMPLETED]: 'Completada',
  [InvestmentStatus.CANCELLED]: 'Cancelada'
} 
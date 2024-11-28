export enum UserRole {
  INVESTOR = 'INVESTOR',
  PSI = 'PSI',           // Property Service Intermediary
  ADMIN = 'ADMIN'
}

export enum UserStatus {
  PENDING = 'PENDING',     // Esperando verificación
  ACTIVE = 'ACTIVE',       // Usuario verificado y activo
  SUSPENDED = 'SUSPENDED', // Usuario temporalmente suspendido
  BLOCKED = 'BLOCKED'      // Usuario bloqueado permanentemente
} 
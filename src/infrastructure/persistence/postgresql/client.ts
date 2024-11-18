import { config } from 'dotenv'
import { PrismaClient } from '@prisma/client'

// Cargar variables de entorno
config()

const prismaClient = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  datasources: {
    db: {
      url: process.env.DATABASE_URL
    }
  }
})

export default prismaClient 
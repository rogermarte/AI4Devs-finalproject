import { PrismaClient, UserType, PropertyStatus, ConnectionStatus, InvestmentStatus } from '@prisma/client'
import { hash } from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  // Limpiar la base de datos
  await prisma.$transaction([
    prisma.message.deleteMany(),
    prisma.connection.deleteMany(),
    prisma.preference.deleteMany(),
    prisma.document.deleteMany(),
    prisma.analysis.deleteMany(),
    prisma.investment.deleteMany(),
    prisma.property.deleteMany(),
    prisma.userProfile.deleteMany(),
    prisma.user.deleteMany(),
  ])

  // Crear PSIs
  const psi1 = await createPSI({
    email: 'psi1@example.com',
    name: 'Ana García',
    phone: '+34666111222'
  })

  const psi2 = await createPSI({
    email: 'psi2@example.com',
    name: 'Carlos Rodríguez',
    phone: '+34666333444'
  })

  // Crear Inversores
  const investor1 = await createInvestor({
    email: 'investor1@example.com',
    name: 'María López',
    phone: '+34666555666'
  })

  const investor2 = await createInvestor({
    email: 'investor2@example.com',
    name: 'Juan Martínez',
    phone: '+34666777888'
  })

  // Crear Propiedades
  const property1 = await createProperty({
    psiId: psi1.id,
    title: 'Apartamento en zona prime Barcelona',
    price: 350000,
    squareMeters: 85
  })

  const property2 = await createProperty({
    psiId: psi1.id,
    title: 'Local comercial en Madrid centro',
    price: 450000,
    squareMeters: 120
  })

  // Crear Inversiones
  await createInvestment({
    investorId: investor1.id,
    propertyId: property1.id,
    amount: 350000
  })

  // Crear Conexiones
  await createConnection(psi1.id, investor1.id)
}

// Funciones auxiliares
async function createPSI({ email, name, phone }: { email: string, name: string, phone: string }) {
  const hashedPassword = await hash('password123', 10)
  
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      profile: {
        create: {
          type: UserType.PSI,
          name,
          phone,
          verifiedAt: new Date(),
          preferences: {
            create: {
              type: 'notification_settings',
              value: {
                email: true,
                push: true
              }
            }
          }
        }
      }
    },
    include: {
      profile: true
    }
  })

  return user
}

async function createInvestor({ email, name, phone }: { email: string, name: string, phone: string }) {
  const hashedPassword = await hash('password123', 10)
  
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      profile: {
        create: {
          type: UserType.INVESTOR,
          name,
          phone,
          preferences: {
            create: {
              type: 'investment_criteria',
              value: {
                minPrice: 200000,
                maxPrice: 500000,
                locations: ['Barcelona', 'Madrid'],
                propertyTypes: ['apartment', 'commercial']
              }
            }
          }
        }
      }
    }
  })

  return user
}

async function createProperty({ psiId, title, price, squareMeters }: { psiId: string, title: string, price: number, squareMeters: number }) {
  const property = await prisma.property.create({
    data: {
      psiId,
      title,
      description: `${title} - Excelente oportunidad de inversión`,
      address: 'Calle Example 123',
      price,
      squareMeters,
      features: {
        rooms: 3,
        bathrooms: 2,
        parking: true
      },
      status: PropertyStatus.PUBLISHED,
      analysis: {
        create: {
          roi: 7.5,
          monthlyIncome: 1500,
          expenses: 200,
          financialMetrics: {
            irr: 12,
            paybackPeriod: 10,
            occupancyRate: 95
          }
        }
      },
      documents: {
        create: {
          type: 'photos',
          url: 'https://example.com/photo1.jpg',
          name: 'Foto Principal'
        }
      }
    }
  })

  return property
}

async function createInvestment({ investorId, propertyId, amount }: { investorId: string, propertyId: string, amount: number }) {
  const investment = await prisma.investment.create({
    data: {
      investorId,
      propertyId,
      status: InvestmentStatus.IN_PROCESS,
      amount,
      documents: {
        create: {
          type: 'contract',
          url: 'https://example.com/contract.pdf',
          name: 'Contrato Preliminar'
        }
      }
    }
  })

  return investment
}

async function createConnection(userFromId: string, userToId: string) {
  const connection = await prisma.connection.create({
    data: {
      userFromId,
      userToId,
      status: ConnectionStatus.ACCEPTED,
      messages: {
        create: {
          senderId: userFromId,
          content: '¡Hola! Me gustaría conectar contigo para discutir oportunidades de inversión.',
          read: true
        }
      }
    }
  })

  return connection
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 
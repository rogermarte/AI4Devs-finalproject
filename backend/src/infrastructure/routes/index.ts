import { Router } from 'express'
import { mockAuthMiddleware } from '../middleware/mockAuth'
import prismaClient from '../persistence/postgresql/client'
import { InvestmentStatus } from '@prisma/client'

const router = Router()

// Properties
router.get('/properties', mockAuthMiddleware, async (_req, res) => {
  try {
    const properties = await prismaClient.property.findMany({
      include: {
        psi: {
          include: {
            profile: true
          }
        }
      }
    })
    console.log('Properties found:', properties.length)
    res.json(properties)
  } catch (error) {
    console.error('Error fetching properties:', error)
    res.status(500).json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    })
  }
})

// Investments
router.post('/investments', mockAuthMiddleware, async (req, res) => {
  try {
    const { propertyId, amount } = req.body
    console.log('Creating investment:', { propertyId, amount, userId: req.user.id })

    // Verificar que la propiedad existe
    const property = await prismaClient.property.findUnique({
      where: { id: propertyId }
    })

    if (!property) {
      return res.status(404).json({ error: 'Property not found' })
    }

    const investment = await prismaClient.investment.create({
      data: {
        investorId: req.user.id,
        propertyId,
        amount,
        status: InvestmentStatus.INTERESTED
      },
      include: {
        property: true,
        investor: {
          include: {
            profile: true
          }
        }
      }
    })

    console.log('Investment created:', investment.id)
    res.json(investment)
  } catch (error) {
    console.error('Error creating investment:', error)
    res.status(500).json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    })
  }
})

// Endpoint temporal para ver los inversores disponibles
router.get('/investors', async (_req, res) => {
  try {
    const investors = await prismaClient.user.findMany({
      include: {
        profile: true
      },
      where: {
        profile: {
          type: 'INVESTOR'
        }
      }
    })
    res.json(investors)
  } catch (error) {
    console.error('Error fetching investors:', error)
    res.status(500).json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    })
  }
})

export default router
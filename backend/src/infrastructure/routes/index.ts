import express from 'express'
import prismaClient from '../persistence/postgresql/client'

const router = express.Router()

// Health check endpoint (fuera del prefijo /api)
router.get('/health', (_, res) => {
  res.json({ status: 'ok' })
})

// API endpoints (con prefijo /api)
router.get('/investors', async (req, res) => {
  try {
    const investors = await prismaClient.user.findMany({
      where: {
        profile: {
          type: 'INVESTOR'
        }
      },
      include: {
        profile: true
      }
    })
    res.json(investors)
  } catch (error) {
    console.error('Error fetching investors:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

export default router
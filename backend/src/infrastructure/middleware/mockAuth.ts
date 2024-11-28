import { Request, Response, NextFunction } from 'express'
import prismaClient from '../persistence/postgresql/client'

declare global {
  namespace Express {
    interface Request {
      user?: any
    }
  }
}

export const mockAuthMiddleware = async (req: Request, _res: Response, next: NextFunction) => {
  try {
    // Buscar el inversor en la base de datos
    const investor = await prismaClient.user.findFirst({
      where: {
        email: 'investor1@example.com',
        profile: {
          type: 'INVESTOR'
        }
      },
      include: {
        profile: true
      }
    })

    if (!investor) {
      throw new Error('Investor not found')
    }

    req.user = investor
    next()
  } catch (error) {
    console.error('Error in mock auth:', error)
    next(error)
  }
}
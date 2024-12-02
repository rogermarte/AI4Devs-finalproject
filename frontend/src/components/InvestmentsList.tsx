import { useState, useEffect } from 'react'
import { config } from '@/config'
import { InvestmentCard } from './InvestmentCard'

interface Investment {
  id: string
  propertyId: string
  amount: number
  status: 'PENDING' | 'APPROVED' | 'REJECTED'
  createdAt: string
  property: {
    title: string
    price: number
    squareMeters: number
    psi: {
      profile: {
        name: string
      }
    }
  }
}

export function InvestmentsList() {
  const [investments, setInvestments] = useState<Investment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchInvestments = async () => {
      try {
        const response = await fetch(`${config.apiUrl}/api/investments`)
        if (!response.ok) throw new Error('Error al cargar inversiones')
        const data = await response.json()
        setInvestments(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido')
      } finally {
        setLoading(false)
      }
    }

    fetchInvestments()
  }, [])

  if (loading) return <div className="text-gray-200">Cargando inversiones...</div>
  if (error) return <div className="text-[#FF6B6B]">{error}</div>

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-white mb-6">Mis Inversiones</h2>
      {investments.length === 0 ? (
        <p className="text-gray-200">No tienes inversiones activas.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {investments.map(investment => (
            <InvestmentCard key={investment.id} investment={investment} />
          ))}
        </div>
      )}
    </div>
  )
} 
'use client'

import { useEffect, useState } from 'react'
import { Property } from '@/types'
import { PropertyCard } from '@/components/PropertyCard'
import { config } from '@/config'

export default function Home() {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProperties = async () => {
    try {
      const res = await fetch(`${config.apiUrl}/api/properties`)
      if (!res.ok) throw new Error('Error cargando propiedades')
      const data = await res.json()
      setProperties(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProperties()
  }, [])

  if (loading) return <div className="p-8">Cargando...</div>
  if (error) return <div className="p-8 text-red-500">Error: {error}</div>

  return (
    <main className="p-8 bg-[#121212] min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-white">InvestHome Pro</h1>
      {properties.length === 0 ? (
        <p>No hay propiedades disponibles</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <PropertyCard 
              key={property.id} 
              property={property}
              onInvestmentComplete={fetchProperties}
            />
          ))}
        </div>
      )}
    </main>
  )
}

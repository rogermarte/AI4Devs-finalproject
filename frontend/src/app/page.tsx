'use client'

import { useEffect, useState } from 'react'
import type { Property } from '@/types'

export default function Home() {
  const [properties, setProperties] = useState<Property[]>([])

  useEffect(() => {
    fetch('http://localhost:4000/api/properties')
      .then(res => res.json())
      .then(data => setProperties(data))
  }, [])

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-8">PSI Platform</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <div key={property.id} className="border rounded-lg p-4">
            <h2 className="text-xl font-semibold">{property.title}</h2>
            <p className="text-gray-600">€{property.price.toLocaleString()}</p>
            <p>{property.squareMeters}m²</p>
            <p className="text-sm text-gray-500">PSI: {property.psi.profile.name}</p>
            <button 
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => {
                // TODO: Implementar inversión
                console.log('Invertir en:', property.id)
              }}
            >
              Invertir
            </button>
          </div>
        ))}
      </div>
    </main>
  )
}

import { Property, PropertyStatus } from '@/types'

interface PropertyCardProps {
  property: Property
}

export function PropertyCard({ property }: PropertyCardProps) {
  const statusColors = {
    [PropertyStatus.PUBLISHED]: 'text-green-600',
    [PropertyStatus.RESERVED]: 'text-yellow-600',
    [PropertyStatus.SOLD]: 'text-red-600',
    [PropertyStatus.DRAFT]: 'text-gray-600'
  }

  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-md transition-shadow">
      <h2 className="text-xl font-semibold mb-2">{property.title}</h2>
      <div className="space-y-2">
        <p className="text-2xl font-bold text-blue-600">
          €{property.price.toLocaleString()}
        </p>
        <p className="text-gray-600">{property.squareMeters}m²</p>
        <div className="text-sm text-gray-500">
          <p>PSI: {property.psi.profile.name}</p>
          <p className={statusColors[property.status]}>
            Estado: {property.status}
          </p>
        </div>
        <button 
          className="w-full mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          onClick={() => {
            console.log('Invertir en:', property.id)
          }}
        >
          Invertir
        </button>
      </div>
    </div>
  )
} 
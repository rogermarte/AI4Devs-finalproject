import { useState } from 'react'
import { Property, PropertyStatus } from '@/types'
import { Modal } from './Modal'
import { InvestmentForm } from './InvestmentForm'

interface PropertyCardProps {
  property: Property
  onInvestmentComplete: () => void
}

export function PropertyCard({ property, onInvestmentComplete }: PropertyCardProps) {
  const [showInvestModal, setShowInvestModal] = useState(false)

  const statusColors = {
    [PropertyStatus.PUBLISHED]: 'text-[#1EA896]',
    [PropertyStatus.RESERVED]: 'text-yellow-400',
    [PropertyStatus.SOLD]: 'text-[#FF6B6B]',
    [PropertyStatus.DRAFT]: 'text-gray-400'
  }

  const handleInvestmentSuccess = () => {
    setShowInvestModal(false)
    onInvestmentComplete()
  }

  return (
    <>
      <div className="border border-gray-700 rounded-lg p-4 shadow bg-[#1E1E1E] hover:shadow-md transition-shadow">
        <h2 className="text-xl font-semibold mb-2 text-white">{property.title}</h2>
        <div className="space-y-2">
          <p className="text-2xl font-bold text-blue-400">
            €{property.price.toLocaleString('es-ES', {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
              useGrouping: true
            })}
          </p>
          <p className="text-gray-400">{property.squareMeters}m²</p>
          <div className="text-sm text-gray-300">
            <p>PSI: {property.psi.profile.name}</p>
            <p className={statusColors[property.status]}>
              Estado: {property.status}
            </p>
          </div>
          <button 
            className="w-full mt-4 bg-[#2B4C7E] text-white px-4 py-2 rounded hover:bg-[#3B5998] transition-colors"
            onClick={() => setShowInvestModal(true)}
          >
            Invertir
          </button>
        </div>
      </div>

      <Modal
        isOpen={showInvestModal}
        onClose={() => setShowInvestModal(false)}
        title={`Invertir en ${property.title}`}
      >
        <InvestmentForm
          propertyId={property.id}
          propertyPrice={property.price}
          onSuccess={handleInvestmentSuccess}
          onCancel={() => setShowInvestModal(false)}
        />
      </Modal>
    </>
  )
} 
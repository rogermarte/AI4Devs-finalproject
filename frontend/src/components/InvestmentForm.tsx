import { useState } from 'react'
import { config } from '@/config'

interface InvestmentFormProps {
  propertyId: string
  propertyPrice: number
  onSuccess: () => void
  onCancel: () => void
}

export function InvestmentForm({ propertyId, propertyPrice, onSuccess, onCancel }: InvestmentFormProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showConfirmation, setShowConfirmation] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`${config.apiUrl}/api/investments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          propertyId,
          amount: propertyPrice
        })
      })

      if (!response.ok) throw new Error('Error al crear la inversión')
      
      setShowConfirmation(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido')
      setLoading(false)
    }
  }

  if (showConfirmation) {
    return (
      <div className="space-y-4">
        <h3 className="text-xl font-semibold mb-4 text-white">¡Solicitud Recibida!</h3>
        <p className="text-gray-200">Tu solicitud de inversión está pendiente de aprobación.</p>
        <p className="text-gray-200">Próximos pasos:</p>
        <ul className="list-disc pl-5 space-y-2 text-gray-200">
          <li>Recibirás un email con las instrucciones para enviar la documentación necesaria</li>
          <li>Nuestro equipo revisará tu solicitud en las próximas 24-48 horas</li>
          <li>Te contactaremos para coordinar los siguientes pasos</li>
        </ul>
        <button
          onClick={onSuccess}
          className="w-full mt-6 bg-[#2B4C7E] text-white px-4 py-2 rounded hover:bg-[#1EA896] transition-colors"
        >
          Entendido
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="bg-[#1E1E1E] p-4 rounded-lg border border-gray-700">
        <p className="text-gray-200 text-sm mb-2">Monto de inversión</p>
        <p className="text-2xl font-bold text-white">
          €{propertyPrice.toLocaleString('es-ES')}
        </p>
      </div>

      {error && (
        <p className="text-[#FF6B6B] text-sm">{error}</p>
      )}

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-200 bg-[#1E1E1E] border border-gray-700 rounded hover:bg-gray-800 transition-colors"
          disabled={loading}
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-[#2B4C7E] rounded hover:bg-[#1EA896] transition-colors"
          disabled={loading}
        >
          {loading ? 'Enviando...' : 'Confirmar Inversión'}
        </button>
      </div>
    </form>
  )
} 
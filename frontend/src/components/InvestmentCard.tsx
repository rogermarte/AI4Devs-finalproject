import { Investment } from '@/types/investment'
import { InvestmentStatus } from '@/types/enums'

interface InvestmentCardProps {
  investment: Investment
}

const statusColors = {
  [InvestmentStatus.INTERESTED]: 'text-yellow-400',
  [InvestmentStatus.IN_PROCESS]: 'text-[#1EA896]',
  [InvestmentStatus.COMPLETED]: 'text-[#1EA896]',
  [InvestmentStatus.CANCELLED]: 'text-[#FF6B6B]'
}

const statusLabels = {
  [InvestmentStatus.INTERESTED]: 'Interesado',
  [InvestmentStatus.IN_PROCESS]: 'En Proceso',
  [InvestmentStatus.COMPLETED]: 'Completada',
  [InvestmentStatus.CANCELLED]: 'Cancelada'
}

export function InvestmentCard({ investment }: InvestmentCardProps) {
  return (
    <div className="border border-gray-700 rounded-lg p-4 shadow bg-[#1E1E1E]">
      <h3 className="text-lg font-semibold text-white mb-2">
        {investment.property.title}
      </h3>
      <div className="space-y-2">
        <p className="text-xl font-bold text-[#1EA896]">
          €{investment.amount.toLocaleString('es-ES')}
        </p>
        <p className="text-gray-400">
          PSI: {investment.property.psi.profile.name}
        </p>
        <p className={`${statusColors[investment.status]} font-medium`}>
          Estado: {statusLabels[investment.status]}
        </p>
        <p className="text-gray-400 text-sm">
          Fecha: {new Date(investment.createdAt).toLocaleDateString('es-ES')}
        </p>
      </div>
    </div>
  )
} 
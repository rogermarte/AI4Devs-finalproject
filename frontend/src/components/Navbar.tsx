import Link from 'next/link'

export function Navbar() {
  return (
    <nav className="bg-[#1E1E1E] border-b border-gray-700 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-white">
          InvestHome Pro
        </Link>
        <div className="space-x-6">
          <Link href="/" className="text-gray-300 hover:text-white">
            Propiedades
          </Link>
          <Link href="/investments" className="text-gray-300 hover:text-white">
            Mis Inversiones
          </Link>
        </div>
      </div>
    </nav>
  )
} 
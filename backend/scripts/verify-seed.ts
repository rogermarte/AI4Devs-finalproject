import { config } from 'dotenv'
import prismaClient from '../src/infrastructure/persistence/postgresql/client'

// Cargar variables de entorno al inicio del script
config()

async function verifySeeds() {
  try {
    console.log('\n🔍 Verificando datos sembrados...\n')

    // Verificar usuarios y sus perfiles
    const users = await prismaClient.user.findMany({
      include: {
        profile: true,
      }
    })
    
    console.log('📊 Estadísticas de Usuarios:')
    console.log('Total usuarios:', users.length)
    console.log('PSIs:', users.filter(u => u.profile?.type === 'PSI').length)
    console.log('Inversores:', users.filter(u => u.profile?.type === 'INVESTOR').length)

    // Verificar propiedades
    const properties = await prismaClient.property.findMany({
      include: {
        analysis: true,
        documents: true,
      }
    })
    
    console.log('\n📊 Estadísticas de Propiedades:')
    console.log('Total propiedades:', properties.length)
    console.log('Con análisis:', properties.filter(p => p.analysis.length > 0).length)
    console.log('Con documentos:', properties.filter(p => p.documents.length > 0).length)

    // Verificar inversiones
    const investments = await prismaClient.investment.findMany({
      include: {
        documents: true,
      }
    })
    
    console.log('\n📊 Estadísticas de Inversiones:')
    console.log('Total inversiones:', investments.length)
    console.log('Con documentos:', investments.filter(i => i.documents.length > 0).length)

    // Verificar conexiones
    const connections = await prismaClient.connection.findMany({
      include: {
        messages: true,
      }
    })
    
    console.log('\n📊 Estadísticas de Conexiones:')
    console.log('Total conexiones:', connections.length)
    console.log('Mensajes totales:', connections.reduce((acc, conn) => acc + conn.messages.length, 0))

  } catch (error) {
    console.error('❌ Error verificando datos:', error)
    process.exit(1)
  } finally {
    await prismaClient.$disconnect()
  }
}

verifySeeds() 
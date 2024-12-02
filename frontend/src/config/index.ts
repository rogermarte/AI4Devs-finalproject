const config = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000',
  isProduction: process.env.NODE_ENV === 'production',
  isAWS: process.env.NEXT_PUBLIC_IS_AWS === 'true'
}

if (!config.apiUrl && config.isProduction) {
  throw new Error('NEXT_PUBLIC_API_URL es requerida en producción')
}

export { config } 
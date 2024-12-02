const config = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000',
  isProduction: process.env.NODE_ENV === 'production'
}

if (typeof window !== 'undefined') {
  console.log('API URL:', config.apiUrl)
}

export { config } 
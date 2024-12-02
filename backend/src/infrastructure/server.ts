import express from 'express'
import cors from 'cors'
import routes from './routes/index'

const app = express()
const port = process.env.PORT || 4000

const allowedOrigins = [
  process.env.CORS_ORIGIN || 'http://localhost:3000',
  'http://localhost:3000'
]

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true
}))

app.use(express.json())

// Health check
app.get('/health', (_, res) => res.json({ status: 'ok' }))

// API routes
app.use('/api', routes)

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})

export default app 
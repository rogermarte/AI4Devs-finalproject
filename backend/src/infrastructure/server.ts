import express from 'express'
import cors from 'cors'
import routes from './routes'

const app = express()
const port = process.env.PORT || 4000

app.use(cors())
app.use(express.json())

// Health check endpoint
app.get('/health', (_, res) => res.json({ status: 'ok' }))

// API routes
app.use('/api', routes)

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})

export default app 
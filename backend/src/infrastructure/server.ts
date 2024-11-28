import express from 'express'
import cors from 'cors'
import { config } from 'dotenv'

config()

const app = express()
const port = process.env.PORT || 4000

app.use(cors())
app.use(express.json())

// Ruta de prueba
app.get('/health', (req, res) => {
  res.json({ status: 'ok' })
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})

export default app 
import express from 'express'
import cors from 'cors'
import { config as dotenvConfig } from 'dotenv'

import usuariosRouter from './routes/usuarios.js'
import authRouter from './routes/auth.js'
import enlacesRouter from './routes/enlaces.js'
import filesRouter from './routes/files.js'
import connectDB from './config/db.js'

dotenvConfig()

const PORT = process.env.PORT || '8080'

const app = express()

//use middlewares and routes
app.use(cors())
app.use(express.json())
app.use(express.static('uploads'))
app.use('/api/usuarios', usuariosRouter)
app.use('/api/auth', authRouter)
app.use('/api/enlaces', enlacesRouter)
app.use('/api/files', filesRouter)

//connections
await connectDB()
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})

import express from 'express'
import { createServer } from 'http'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app = express()
const server = createServer( app )
dotenv.config()
import authRouter from './routes/ath.route.js'

app.use( express.json() )
app.use( cookieParser() )
app.use( cors({

    origin: 'http://localhost:5173',
    credentials : true

}) )

app.use('/authenticate', authRouter)

// No need for vercel
server.listen( process.env.PORT || 5000, () => {

    console.log('Server running')

} )

export default app
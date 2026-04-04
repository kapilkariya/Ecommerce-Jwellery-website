import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'

import connectDB from './config/mongodb.js'
import connectcloudinary from './config/cloudinary.js'
import userrouter from './routes/userrouter.js'
import productrouter from './routes/productroute.js'
import cartrouter from './routes/cartroute.js'
import orderRouter from './routes/orderroute.js'
import authroute from './routes/authroute.js'
import feedbackRouter from './routes/feedbackroute.js'
import "./config/passport.js"

const app = express()

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Middlewares
app.use(express.json())

app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:5174',
    'https://ecommerce-jwellery-website-miwq.vercel.app',
    'https://unifindhub.com'
  ],
  credentials: true
}))

// Routes
app.use('/auth', authroute)
app.use('/api/user', userrouter)
app.use('/api/product', productrouter)
app.use('/api/cart', cartrouter)
app.use('/api/order', orderRouter)
app.use('/api/feedback', feedbackRouter)

// Serve frontend only if build exists
const distPath = path.resolve(__dirname, '../Frontend/dist')

if (fs.existsSync(distPath)) {
  app.use(express.static(distPath))

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"))
  })
}

// Start server
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)

  // connect services AFTER server starts
  connectDB().catch(err => console.error("MongoDB error:", err))
  connectcloudinary()
})
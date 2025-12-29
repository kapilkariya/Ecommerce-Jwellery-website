import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectcloudinary from './config/cloudinary.js'
import userrouter from './routes/userrouter.js'
import productrouter from './routes/productroute.js'
import cartrouter from './routes/cartroute.js'
import orderRouter from './routes/orderroute.js'

// App Config
const app = express()
const port = process.env.PORT || 3000
connectDB();
connectcloudinary();

// middlewares
app.use(express.json())
app.use(cors())
app.use('/api/user',userrouter);
app.use('/api/product',productrouter);
app.use('/api/cart',cartrouter)
app.use('/api/order',orderRouter)

app.get('/', (req, res) => {
    res.send("API Working")
})

app.listen(port, () => console.log('Server started on PORT : ' + port))
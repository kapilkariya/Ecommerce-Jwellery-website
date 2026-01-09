import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectcloudinary from './config/cloudinary.js'
import userrouter from './routes/userrouter.js'
import productrouter from './routes/productroute.js'
import cartrouter from './routes/cartroute.js'
import orderRouter from './routes/orderroute.js'
import authroute from './routes/authroute.js'
import "./config/passport.js"

// App Config
const app = express()
connectDB();
connectcloudinary();

// middlewares
app.use(express.json())
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'https://ecommerce-jwellery-website-miwq.vercel.app',
  'https://ecommerce-jwellery-website.vercel.app',  
  process.env.CLIENT_URL,
  process.env.ADMIN_URL
];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true
}));

app.use('/auth', authroute)
app.use('/api/user', userrouter);
app.use('/api/product', productrouter);
app.use('/api/cart', cartrouter)
app.use('/api/order', orderRouter)



app.get('/', (req, res) => {
  res.send("API Working")
})

// app.listen(3000, () => console.log('Server started on PORT : 3000'))
export default app;
import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { notFound,errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'
const port =process.env.PORT||5000
import userRoutes from './routes/userRoute.js'

dotenv.config()
connectDB()

const app=express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use(cookieParser())
app.use(express.static('backend/public'))
app.use('/api/users',userRoutes)


app.use(notFound)
app.use(errorHandler)
app.listen(port,()=>
console.log(`Server started on port ${port}`))
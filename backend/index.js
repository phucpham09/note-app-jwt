import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import "dotenv/config";
import cookieParser from "cookie-parser";
import authRoute from './routes/authRoute.js'
import noteRoute from './routes/noteRoute.js'
const app = express();

if(mongoose.connect(process.env.MONGO_URI)){
    console.log("Connected to DB successfully!")
}else{
    console.log("Can't connect to DB")
}

const port = process.env.PORT
app.use(cookieParser())
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}))

app.use('/auth', authRoute);
app.use('/notes', noteRoute);
app.listen(port, (req, res) =>{
    console.log(`Server running on port: ${port}`)
})
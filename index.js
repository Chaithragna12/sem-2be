import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import tourRoute from './routes/tours.js'
import userRoute from './routes/users.js'
import authRoute from './routes/auth.js'
import reviewRoute from './routes/reviews.js'
import bookRoute from './routes/booking.js'
dotenv.config()
const app = express()
const port = process.env.PORT || 8000;
const corsOptions={
    origin:true,
    credentials:true
}

// Middleware

app.use(express.json())
app.use(cors(corsOptions))
app.use(cookieParser())
app.use('/api/v1/tours',tourRoute)
app.use('/api/v1/users',userRoute)
app.use('/api/v1/auth',authRoute)
app.use('/api/v1/review',reviewRoute)
app.use('/api/v1/booking',bookRoute)






// DB Connect
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB database connected");
    } catch (err) {
        console.error("MongoDB database connection failed", err);
        process.exit(1); // Exit process with failure
    }
};

app.get('/', (req, res) => {
    res.send("API is working");
});

// Start the server only if the database connection is successful
app.listen(port,()=>{
    connect()
    console.log(`Server running on port ${port}`);
})
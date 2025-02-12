import express, { Request, Response } from "express";
import dotenv from "dotenv";
import connectDB from "./config/mongoConfig";
import errorMiddleware from './middleware/error'
import authRouter from './routes/authRoute'


// handling uncaught exception
process.on("uncaughtException",(err:any)=>{
    console.log(`Error : ${err.message}`)
    console.log("Shutting down the server due to uncaught exception")

    server.close(()=>{
        process.exit(1);
    })
})

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();
app.use(express.json());
app.use(errorMiddleware)  // error middleware

// routes -->
app.get('/',(req:Request, res:Response)=>{
    res.json({
        "message":"server up and running"
    })
})
app.use('/api/auth',authRouter)

// server
const server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// handling unhandled promise rejection
process.on("unhandledRejection",(err:any)=>{
    console.log(`Error : ${err.message}`)
    console.log("Shutting down the server due to unhandled Promise Rejection")

    server.close(()=>{
        process.exit(1);
    })
})

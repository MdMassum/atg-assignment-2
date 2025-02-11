import express, { Request, Response } from "express";
import dotenv from "dotenv";
import connectDB from "./config/mongoConfig";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();
app.use(express.json());

app.get('/',(req:Request, res:Response)=>{
    res.json({
        "message":"server up and running"
    })
})


// server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
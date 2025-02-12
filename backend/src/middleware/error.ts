import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/errorHandler";

const errorMiddleware =(err:any, req:Request, res:Response, next:NextFunction)=>{

    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal server error"
    console.log(err)

    if(err.name === 'ValidationError'){
        const messages = Object.values(err.errors).map((error:any)=>error.message);
        const message = `Validation Error: ${messages.join(", ")}`;
        err = new ErrorHandler(message, 400);
    }

    // wrong mongodb id error i.e if wrong id is passed
    if(err.name === "CastError"){
        const message = `Resource not found, Invalid: ${err.path}`;
        err = new ErrorHandler(message,400);
    }

    // mongodb duplicate key error i.e if someone register using email that already exists
    if(err.code === 11000){
        const message = `Duplicate field value entered: ${Object.keys(err.keyValue).join(", ")}`;
        err = new ErrorHandler(message,400)
    }

    // wrong JWT error
    if(err.name === "JsonWebTokenError"){
        const message = `json Web Token is invalid, try again`
        err = new ErrorHandler(message,400)
    }

    // JWT Expire error
    if(err.name === "TokenExpiredError"){
        const message = `json Web Token is Expired, try again`
        err = new ErrorHandler(message,400)
    }

    res.status(err.statusCode).json({
        success:false,
        message:err.message
    })
}

export default errorMiddleware
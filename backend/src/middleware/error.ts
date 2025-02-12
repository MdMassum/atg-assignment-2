import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/errorHandler";

const errorMiddleware =(err:any, req:Request, res:Response, next:NextFunction)=>{

    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal server error"

    // wrong mongodb id error i.e if wrong id is passed
    if(err.name === "CastError"){
        const message = `Resource not found, Invalid: ${err.path}`;
        err = new ErrorHandler(message,400);
    }

    // mongodb duplicate key error i.e if someone register using email that already exists
    if(err.code === 11000){
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`
        err = new ErrorHandler(message,400)
    }

    // wrong JWT error
    if(err.name === "jsonWebTokenError"){
        const message = `json Web Token is invalid, try again`
        err = new ErrorHandler(message,400)
    }

    // JWT Expire error
    if(err.name === "jsonExpiredError"){
        const message = `json Web Token is Expired, try again`
        err = new ErrorHandler(message,400)
    }

    res.status(err.statusCode).json({
        success:false,
        message:err.message
    })
}

export default errorMiddleware
import { Response, NextFunction } from "express";
import { verifyToken } from "../utils/auth";
import { AuthenticatedRequest } from "../types/express";
import ErrorHandler from "../utils/errorHandler";

const authenticate = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {

  const token = req.cookies?.token

  if (!token) {
    return next(new ErrorHandler("Access denied, Please Login First !!",401));
  }

  try {

    const decoded = verifyToken(token);
    req.userId = decoded.userId; 
    next();
    
  } catch (err) {
    return next(new ErrorHandler("Invalid token",401));
  }
};

export default authenticate

import { Response, NextFunction } from "express";
import { verifyToken } from "../utils/auth";
import { AuthenticatedRequest } from "../types/express";

export const authenticate = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {

  const token = req.cookies?.token;
  if (!token) {
    res.status(401).json({ message: "Access denied, Please Login First !!" });
    return;
  }

  try {

    const decoded = verifyToken(token);
    req.userId = decoded.userId; 
    next();
    
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

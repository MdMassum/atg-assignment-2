// src/types/express/index.d.ts
import * as express from 'express';
import { Request } from "express";
declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

export interface AuthenticatedRequest extends Request {
  userId?: string; // Adjust type based on your decoding result
}

import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs';

// Hash password
export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, 10);
};

// Compare password
export const comparePassword = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);
};

// Generate JWT token
export const generateToken = (userId: string) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
};

// Verify JWT token
export const verifyToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string };
};

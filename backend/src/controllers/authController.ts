import User from '../models/authModel';
import { NextFunction, Request, Response } from 'express';
import { comparePassword, generateToken, hashPassword } from '../utils/auth';
import ErrorHandler from '../utils/errorHandler';
import crypto from 'crypto';
import sendMail from '../utils/sendMail';

// user signup
export const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return next(new ErrorHandler("Email, Username, or Password cannot be empty", 400));
    }

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return next(new ErrorHandler("User already exists", 400));
    }

    // Hash password and create user
    const hashedPassword = await hashPassword(password);
    const user = await User.create({ username, email, password: hashedPassword });

    res.status(201).json({
      success: true,
      user,
    });

  } catch (error) {
    next(new ErrorHandler("Internal server error", 500));
  }
};


// user login
export const login = async (req: Request, res: Response, next: NextFunction) => {

  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return next(new ErrorHandler("Please enter username and password", 400));
    }

    // Find user and validate password
    const user = await User.findOne({ username }).select('+password');
    if (!user) {
      return next(new ErrorHandler("Invalid username or password", 401));
    }

    const isValidPassword = await comparePassword(password, user.password);
    if (!isValidPassword) {
      return next(new ErrorHandler("Invalid username or password", 401));
    }

    // Generate token and set cookie
    const token = generateToken(user.id);
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600000, // 1 hour
    });

    res.status(200).json({
      success: true,
      user,
      token,
    });

  } catch (error) {
    next(new ErrorHandler("Internal server error", 500));
  }
};

// user logout
export const logout = async (req: Request, res: Response) => {

  try {
      // Clear the token cookie
      res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      });
    
      res.status(200).json({success:true,message:"Logout Successfully"});

  } catch (error) {
    res.status(500).json({success:false, message: 'Internal server error' })
  }
};

// forgot password -->
export const forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.body;

    if (!email) {
      return next(new ErrorHandler("Please provide an email address", 400));
    }

    const user = await User.findOne({ email });
    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    // Generate reset token and set expiration
    const resetToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    user.resetPasswordExpire = new Date (Date.now() + 3600000); // 1 hour
    await user.save();

    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;

    const message = `Your Password reset token is :\n ${resetPasswordUrl}\n\nIf you have not requested this email please ignore it !!`

    try {
        // Send email
        await sendMail({email:user.email,subject:"Password Recovery",message });

        res.status(200).json({
            success:true,
            message:`Email sent to ${user.email} successfully`
        })

    } catch (error:any) {  // if some error occurs chang database reset token to undefine
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({validateBeforeSave:false});

        return(next(new ErrorHandler(error.message,500)))
    }

  } catch (error) {
    next(new ErrorHandler("Internal server error", 500));
  }
};


// reset password -->
export const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return next(new ErrorHandler("Token and new password are required", 400));
    }

    // Hash the token and find user
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return next(new ErrorHandler("Invalid or expired token", 400));
    }

    // Update password and clear reset fields
    user.password = await hashPassword(newPassword);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password reset successful",
    });

  } catch (error) {
    next(new ErrorHandler("Internal server error", 500));
  }
};
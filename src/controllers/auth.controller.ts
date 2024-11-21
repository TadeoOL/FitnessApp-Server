import { Request, Response, NextFunction } from 'express';
import { HttpException } from '../middleware/error.middleware';
import { ILoginData, IUser } from '../interfaces/user.interface';
import bcrypt from 'bcrypt';
import jwtService from '../services/jwt.service';
import crypto from 'crypto';
import emailService from '../services/email.service';
import User from '../models/user.model';

export default class AuthController {
  public async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password, name } = req.body;

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new HttpException(400, 'User already exists');
      }

      const verificationToken = crypto.randomBytes(32).toString('hex');
      const verificationTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = await User.create({
        email,
        password: hashedPassword,
        name,
        verificationToken,
        verificationTokenExpires,
        isVerified: false
      });

      await emailService.sendVerificationEmail(email, verificationToken);

      res.status(201).json({
        message: 'Registration successful. Please check your email to verify your account.',
        user: {
          id: newUser.id,
          email: newUser.email,
          name: newUser.name
        }
      });
    } catch (error) {
      next(error);
    }
  }

  public async verifyEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const { code } = req.body;

      const user = await User.findOne({
        verificationToken: new RegExp(`^${code}`, 'i'),
        verificationTokenExpires: { $gt: Date.now() }
      });

      if (!user) {
        throw new HttpException(400, 'Invalid or expired verification code');
      }

      user.isVerified = true;
      user.verificationToken = undefined;
      user.verificationTokenExpires = undefined;
      await user.save();

      const tokenData = jwtService.generateToken(user);

      res.status(200).json({
        message: 'Email verified successfully',
        token: tokenData.token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name
        }
      });
    } catch (error) {
      next(error);
    }
  }

  public async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password }: ILoginData = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        throw new HttpException(401, 'User not found');
      }

      if (!user.isVerified) {
        throw new HttpException(401, 'Please verify your email first');
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new HttpException(401, 'Invalid password');
      }

      const tokenData = jwtService.generateToken(user as IUser);

      res.status(200).json({
        message: 'Login successful',
        token: tokenData.token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name
        }
      });
    } catch (error) {
      next(error);
    }
  }

  public async logout(req: Request, res: Response, next: NextFunction) {
    try {
      // TODO: Implement logout logic
      res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
      console.log(error);
      next(new HttpException(500, 'Error during logout'));
    }
  }

  public async refreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      // TODO: Implement refresh token logic
      res.status(200).json({
        message: 'Token refreshed',
        token: 'new-jwt-token'
      });
    } catch (error) {
      console.log(error);
      next(new HttpException(401, 'Invalid refresh token'));
    }
  }
} 
import { Request, Response, NextFunction } from 'express';
import { HttpException } from '../middleware/error.middleware';
import User from '../models/user.model';
import { IUser } from 'src/interfaces/user.interface';

export default class UserController {
  public async getUsers(_req: Request, res: Response, next: NextFunction) {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error: any) {
      console.log(error);
      next(new HttpException(500, 'Error getting users'));
    }
  }

  public async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      if (!user) {
        throw new HttpException(404, 'User not found');
      }
      res.status(200).json(user);
    } catch (error: any) {
      next(new HttpException(error.status, error.message));
    }
  }

  public async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { name, email } = req.body;
      const updatedUser = await User.findByIdAndUpdate(id, { name, email }, { new: true });
      console.log({updatedUser});
      const user: Omit<IUser, 'password'> = {
        _id: updatedUser?.id as string,
        email: updatedUser?.email as string,
        name: updatedUser?.name as string,
      }
      res.status(200).json(user);
    } catch (error: any) {
      next(new HttpException(error.status, error.message));
    }
  }

  public async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await User.findByIdAndDelete(id);
      res.status(200).json({ message: `Delete user ${id}` });
    } catch (error) {
      console.log(error);
      next(new HttpException(500, 'Error deleting user'));
    }
  }
} 
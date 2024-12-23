import { Request, Response, NextFunction } from "express";
import { HttpException, createHttpError } from "../middleware/error.middleware";
import { UserModel } from "../models/entities/user.model";
import { getMessage, MessageKeys } from "../locales";

export default class UserController {
  public async getUsers(_req: Request, res: Response, next: NextFunction) {
    try {
      const users = await UserModel.find();
      res.status(200).json(users);
    } catch (error: any) {
      next(createHttpError(500, "errors", "INTERNAL_ERROR"));
    }
  }

  public async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const user = await UserModel.findById(id);
      if (!user) {
        throw createHttpError(404, "user", "NOT_FOUND");
      }
      res.status(200).json(user);
    } catch (error: any) {
      if (error instanceof HttpException) {
        next(createHttpError(error.status, error.category, error.message));
      } else {
        next(createHttpError(500, "errors", "INTERNAL_ERROR"));
      }
    }
  }

  public async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { name, email } = req.body;
      const updatedUser = await UserModel.findByIdAndUpdate(
        id,
        { name, email },
        { new: true }
      );

      if (!updatedUser) {
        throw createHttpError(404, "user", "NOT_FOUND");
      }

      res.status(200).json(updatedUser);
    } catch (error: any) {
      if (error instanceof HttpException) {
        next(error);
      } else {
        next(createHttpError(500, "errors", "INTERNAL_ERROR"));
      }
    }
  }

  public async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const deletedUser = await UserModel.findByIdAndDelete(id);

      if (!deletedUser) {
        throw createHttpError(404, "user", "NOT_FOUND");
      }

      res.status(200).json({ message: `Delete user ${id}` });
    } catch (error) {
      if (error instanceof HttpException) {
        next(error);
      } else {
        next(createHttpError(500, "errors", "INTERNAL_ERROR"));
      }
    }
  }

  public async updateLanguage(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        throw createHttpError(401, "auth", "NOT_AUTHENTICATED");
      }

      const { language } = req.body;
      if (!language) {
        throw createHttpError(400, "errors", "INVALID_REQUEST");
      }

      const userId = req.user.id;
      const updatedUser = await UserModel.findByIdAndUpdate(
        userId,
        { language },
        { new: true }
      );

      if (!updatedUser) {
        throw createHttpError(404, "user", "NOT_FOUND");
      }

      res.json({
        message: getMessage(
          req.language || "en",
          "user",
          "LANGUAGE_UPDATED" as MessageKeys
        ),
      });
    } catch (error) {
      if (error instanceof HttpException) {
        next(error);
      } else {
        next(createHttpError(500, "errors", "INTERNAL_ERROR"));
      }
    }
  }
}

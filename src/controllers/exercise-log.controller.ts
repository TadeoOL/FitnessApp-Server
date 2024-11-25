import { Request, Response, NextFunction } from 'express';
import { ExerciseLogModel } from '../models/entities/exercise-log.model';
import { createHttpError } from '../middleware/error.middleware';

export class ExerciseLogController {
  static async createLog(req: Request, res: Response, next: NextFunction) {
    try {
      const { exerciseId, reps, weight, rir, notes } = req.body;
      const userId = req.user?.id;

      const log = await ExerciseLogModel.create({
        userId,
        exerciseId,
        reps,
        weight,
        rir,
        notes,
        date: new Date()
      });

      res.status(201).json(log);
    } catch (error) {
      next(createHttpError(400, 'errors', 'INVALID_REQUEST'));
    }
  }

  static async getExerciseLogs(req: Request, res: Response, next: NextFunction) {
    try {
      const { exerciseId } = req.params;
      const userId = req.user?.id;

      const logs = await ExerciseLogModel.find({
        userId,
        exerciseId
      })
      .sort({ date: -1 })
      .populate('exerciseId');

      res.json(logs);
    } catch (error) {
      next(createHttpError(500, 'errors', 'INTERNAL_ERROR'));
    }
  }

  static async getLogById(req: Request, res: Response, next: NextFunction) {
    try {
      const log = await ExerciseLogModel.findById(req.params.id)
        .populate('exerciseId');
      
      if (!log) {
        return next(createHttpError(404, 'errors', 'NOT_FOUND'));
      }

      res.json(log);
    } catch (error) {
      next(createHttpError(500, 'errors', 'INTERNAL_ERROR'));
    }
  }
} 
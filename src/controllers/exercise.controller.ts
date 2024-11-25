import { Request, Response, NextFunction } from 'express';
import { ExerciseModel } from '../models/entities/exercise.model';
import { createHttpError } from '../middleware/error.middleware';

export class ExerciseController {
  static async createExercise(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, description, muscleGroup, equipment } = req.body;

      console.log('Request body:', req.body);
      
      const exercise = await ExerciseModel.create({
        name,
        description,
        muscleGroup,
        equipment
      });

      res.status(201).json(exercise);
    } catch (error) {
      console.error('Error creating exercise:', error);
      next(createHttpError(400, 'errors', 'INVALID_REQUEST'));
    }
  }

  static async getExercises(_req: Request, res: Response, next: NextFunction) {
    try {
      const exercises = await ExerciseModel.find();
      res.json(exercises);
    } catch (error) {
      next(createHttpError(500, 'errors', 'INTERNAL_ERROR'));
    }
  }

  static async getExerciseById(req: Request, res: Response, next: NextFunction) {
    try {
      const exercise = await ExerciseModel.findById(req.params.id);
      
      if (!exercise) {
        return next(createHttpError(404, 'errors', 'NOT_FOUND'));
      }

      res.json(exercise);
    } catch (error) {
      next(createHttpError(500, 'errors', 'INTERNAL_ERROR'));
    }
  }
} 
import { Request, Response, NextFunction } from "express";
import { RoutineModel } from "../models/entities/routine.model";
import { createHttpError } from "../middleware/error.middleware";

export class RoutineController {
  static async createRoutine(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, description } = req.body;
      const userId = req.user?.id;

      const routine = await RoutineModel.create({
        name,
        userId,
        description,
      });

      res.status(201).json(routine);
    } catch (error) {
      console.log(error);
      next(createHttpError(400, "errors", "INVALID_REQUEST"));
    }
  }

  static async getRoutines(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.id;
      const routines = await RoutineModel.find({ userId }).populate(
        "exercises.exerciseId"
      );

      res.json(routines);
    } catch (error) {
      next(createHttpError(500, "errors", "INTERNAL_ERROR"));
    }
  }

  static async getRoutineById(req: Request, res: Response, next: NextFunction) {
    try {
      const routine = await RoutineModel.findById(req.params.id).populate(
        "exercises.exerciseId"
      );

      if (!routine) {
        return next(createHttpError(404, "errors", "NOT_FOUND"));
      }

      res.json(routine);
    } catch (error) {
      next(createHttpError(500, "errors", "INTERNAL_ERROR"));
    }
  }

  static async addExerciseToRoutine(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { routineId } = req.params;
      const { exerciseId } = req.body;

      const routine = await RoutineModel.findById(routineId);

      if (!routine) {
        return next(createHttpError(404, "errors", "NOT_FOUND"));
      }

      const nextOrder = (routine.exercises?.length || 0) + 1;

      if (
        routine.exercises?.find((ex) => ex.exerciseId.toString() === exerciseId)
      ) {
        return next(
          createHttpError(400, "errors", "EXERCISE_ALREADY_IN_ROUTINE")
        );
      }

      routine.exercises = [
        ...(routine.exercises || []),
        {
          exerciseId: exerciseId,
          order: nextOrder,
        },
      ];

      await routine.save();

      res.json(routine);
    } catch (error) {
      next(createHttpError(400, "errors", "INVALID_REQUEST"));
    }
  }

  static async removeExerciseFromRoutine(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { routineId, exerciseId } = req.params;
      const routine = await RoutineModel.findById(routineId);

      if (!routine) {
        return next(createHttpError(404, "errors", "NOT_FOUND"));
      }

      routine.exercises = routine.exercises?.filter(
        (ex) => ex.exerciseId.toString() !== exerciseId
      );
      await routine.save();

      res.json(routine);
    } catch (error) {
      next(createHttpError(400, "errors", "INVALID_REQUEST"));
    }
  }

  static async changeExerciseOrder(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { routineId } = req.params;
      const { exerciseId, newOrder } = req.body;

      console.log(exerciseId, newOrder);
      res.json();

      const routine = await RoutineModel.findById(routineId);
    } catch (error) {
      console.log(error);
      next(createHttpError(400, "errors", "INVALID_REQUEST"));
    }
  }

  static async deleteRoutine(req: Request, res: Response, next: NextFunction) {
    try {
      const { routineId } = req.params;
      await RoutineModel.findByIdAndDelete(routineId);
      res.status(204).send();
    } catch (error) {
      next(createHttpError(400, "errors", "INVALID_REQUEST"));
    }
  }

  static async updateRoutine(req: Request, res: Response, next: NextFunction) {
    try {
      const { routineId } = req.params;
      const { name, description } = req.body;

      const routine = await RoutineModel.findByIdAndUpdate(
        routineId,
        {
          name,
          description,
        },
        { new: true }
      );

      res.json(routine);
    } catch (error) {
      console.log(error);
      next(createHttpError(400, "errors", "INVALID_REQUEST"));
    }
  }
}

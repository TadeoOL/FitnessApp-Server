import { Request, Response, NextFunction } from "express";
import { createHttpError } from "../middleware/error.middleware";
import { MicrocycleModel } from "../models/entities/microcycle";
import { MesocycleModel } from "../models/entities/mesocycle";

export class MicrocycleController {
  static async assignRoutineToDay(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { mesocycleId, dayNumber } = req.params;
      const { routineId } = req.body;

      const mesocycle = await MesocycleModel.findOne({
        _id: mesocycleId,
        userId: req.user?.id,
      });

      if (!mesocycle) {
        return next(createHttpError(404, "errors", "MESOCYCLE_NOT_FOUND"));
      }

      const microcycles = await MicrocycleModel.find({
        mesocycleId,
      });

      if (!microcycles.length) {
        return next(createHttpError(404, "errors", "MICROCYCLES_NOT_FOUND"));
      }

      await MicrocycleModel.updateMany(
        { mesocycleId },
        {
          $set: {
            "days.$[day].routineId": routineId,
            "days.$[day].isRestDay": false,
          },
        },
        {
          arrayFilters: [{ "day.dayNumber": parseInt(dayNumber) }],
        }
      );

      res.json({ message: "Routine assigned successfully" });
    } catch (error) {
      console.error("Error:", error);
      next(createHttpError(400, "errors", "INVALID_REQUEST"));
    }
  }

  static async addExerciseToDay(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { mesocycleId, dayNumber, microNumber } = req.params;
      const { exerciseId, sets, notes, order } = req.body;

      const microcycle = await MicrocycleModel.findOneAndUpdate(
        {
          mesocycleId,
          cycleNumber: parseInt(microNumber),
          "days.dayNumber": parseInt(dayNumber),
        },
        {
          $push: {
            "days.$.exercises": {
              exerciseId,
              sets,
              notes,
              order,
            },
          },
        },
        { new: true }
      ).populate("days.exercises.exerciseId");

      res.json(microcycle);
    } catch (error) {
      next(createHttpError(400, "errors", "INVALID_REQUEST"));
    }
  }
}

import { NextFunction, Request, Response } from "express";
import { createHttpError } from "../middleware/error.middleware";
import { MicrocycleModel } from "../models/entities/microcycle";
import { MesocycleModel } from "../models/entities/mesocycle";

interface SetConfiguration {
  exerciseId: string;
  numberOfSets: number;
}

interface DayConfiguration {
  dayNumber: number;
  routineId?: string;
  isRestDay: boolean;
  exerciseSets?: SetConfiguration[];
  notes?: string;
}

interface MesocycleCreateDTO {
  name: string;
  totalMicrocycles: number;
  daysPerMicrocycle: number;
  notes?: string;
  daysConfiguration: DayConfiguration[];
}

export class MesocycleController {
  static async createMesocycleWithMicros(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { name, totalMicrocycles, daysPerMicrocycle } = req.body;

      const mesocycle = await MesocycleModel.create({
        name,
        userId: req.user?.id,
        totalMicrocycles,
        daysPerMicrocycle,
      });

      const microcycles = [];
      for (let i = 1; i <= totalMicrocycles; i++) {
        const days = Array.from({ length: daysPerMicrocycle }, (_, index) => ({
          dayNumber: index + 1,
          isRestDay: true,
          exercises: [],
        }));

        const microcycle = await MicrocycleModel.create({
          cycleNumber: i,
          mesocycleId: mesocycle._id,
          days,
          isDeload: i === totalMicrocycles,
        });

        microcycles.push(microcycle);
      }

      res.status(201).json({
        mesocycle,
        microcycles,
      });
    } catch (error) {
      console.error("Error:", error);
      next(createHttpError(400, "errors", "INVALID_REQUEST"));
    }
  }

  static async getMesocycles(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.id;

      const mesocycles = await MesocycleModel.find({ userId }).sort({
        createdAt: -1,
      });

      res.json(mesocycles);
    } catch (error) {
      console.error("Error getting mesocycles:", error);
      next(createHttpError(500, "errors", "INTERNAL_ERROR"));
    }
  }

  static async getMesocycleWithMicros(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { mesocycleId } = req.params;
      const userId = req.user?.id;

      const mesocycle = await MesocycleModel.findOne({
        _id: mesocycleId,
        userId,
      });

      if (!mesocycle) {
        return next(createHttpError(404, "errors", "MESOCYCLE_NOT_FOUND"));
      }

      const microcycles = await MicrocycleModel.find({
        mesocycleId,
      })
        .sort({ cycleNumber: 1 })
        .populate({
          path: "days.routineId",
          select: "name description exercises",
        });

      res.json({
        mesocycle,
        microcycles,
      });
    } catch (error) {
      console.error("Error getting mesocycle:", error);
      next(createHttpError(500, "errors", "INTERNAL_ERROR"));
    }
  }

  // FULL MESOCYCLE

  static async createFullMesocycle(
    req: Request<{}, {}, MesocycleCreateDTO>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const {
        name,
        totalMicrocycles,
        daysPerMicrocycle,
        notes,
        daysConfiguration,
      } = req.body;

      // 1. Crear el mesociclo
      const mesocycle = await MesocycleModel.create({
        name,
        userId: req.user?.id,
        totalMicrocycles,
        daysPerMicrocycle,
        notes,
      });

      // 2. Crear los microciclos con su configuración
      const microcycles = [];
      for (let i = 1; i <= totalMicrocycles; i++) {
        // Configurar los días según la configuración recibida
        const days = daysConfiguration.map((dayConfig) => {
          const daySetup: any = {
            dayNumber: dayConfig.dayNumber,
            routineId: dayConfig.routineId,
            isRestDay: dayConfig.isRestDay,
            notes: dayConfig.notes,
            exercises: [],
          };

          // Si hay rutina y configuración de sets, agregarlos
          if (dayConfig.routineId && dayConfig.exerciseSets) {
            daySetup.exercises = dayConfig.exerciseSets.map((setConfig) => ({
              exerciseId: setConfig.exerciseId,
              sets: Array(setConfig.numberOfSets).fill({
                reps: 0,
                weight: 0,
                rir: 2,
              }),
              order: 1, // El orden se puede manejar en el frontend
            }));
          }

          return daySetup;
        });

        const microcycle = await MicrocycleModel.create({
          cycleNumber: i,
          mesocycleId: mesocycle._id,
          days,
          isDeload: i === totalMicrocycles,
        });

        microcycles.push(microcycle);
      }

      // 3. Obtener el resultado populado
      const populatedMicrocycles = await MicrocycleModel.find({
        mesocycleId: mesocycle._id,
      })
        .sort({ cycleNumber: 1 })
        .populate({
          path: "days.routineId",
          select: "name description",
        })
        .populate({
          path: "days.exercises.exerciseId",
          select: "name muscleGroup equipment",
        });

      res.status(201).json({
        mesocycle,
        microcycles: populatedMicrocycles,
      });
    } catch (error) {
      console.error("Error creating mesocycle:", error);
      next(createHttpError(400, "errors", "INVALID_REQUEST"));
    }
  }
}

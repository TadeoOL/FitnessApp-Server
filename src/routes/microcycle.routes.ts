import { Router } from "express";
import { MicrocycleController } from "../controllers/microcycle.controller";

const microcycleRouter = Router();

microcycleRouter.put(
  "/:mesocycleId/day/:dayNumber",
  MicrocycleController.assignRoutineToDay
);

microcycleRouter.post(
  "/:mesocycleId/day/:dayNumber/micro/:microNumber/exercise",
  MicrocycleController.addExerciseToDay
);

export default microcycleRouter;

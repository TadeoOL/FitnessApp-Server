import { Router } from "express";
import { RoutineController } from "../controllers/routine.controller";

const routineRouter = Router();

routineRouter.post("/", RoutineController.createRoutine);
routineRouter.post(
  "/:routineId/exercises",
  RoutineController.addExerciseToRoutine
);
routineRouter.delete(
  "/:routineId/exercises/:exerciseId",
  RoutineController.removeExerciseFromRoutine
);
routineRouter.get("/", RoutineController.getRoutines);
routineRouter.get("/:id", RoutineController.getRoutineById);
routineRouter.delete("/:routineId", RoutineController.deleteRoutine);
routineRouter.put("/:routineId", RoutineController.updateRoutine);

export default routineRouter;

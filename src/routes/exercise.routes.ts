import { Router } from "express";
import { ExerciseController } from "../controllers/exercise.controller";

const exerciseRouter = Router();

exerciseRouter.post("/", ExerciseController.createExercise);
exerciseRouter.get("/", ExerciseController.getExercises);
exerciseRouter.get("/:id", ExerciseController.getExerciseById);

export default exerciseRouter;

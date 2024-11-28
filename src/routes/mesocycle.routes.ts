import { Router } from "express";
import { MesocycleController } from "../controllers/mesocycle.controller";

const mesocycleRouter = Router();

mesocycleRouter.post("/", MesocycleController.createMesocycleWithMicros);
mesocycleRouter.get("/", MesocycleController.getMesocycles);
mesocycleRouter.get(
  "/:mesocycleId",
  MesocycleController.getMesocycleWithMicros
);
mesocycleRouter.post("/full", MesocycleController.createFullMesocycle);

export default mesocycleRouter;

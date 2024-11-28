import { Router } from "express";
import userRoutes from "./user.routes";
import authRoutes from "./auth.routes";
import routineRoutes from "./routine.routes";
import exerciseRoutes from "./exercise.routes";
import exerciseLogRoutes from "./exercise-log.routes";
import mesocycleRoutes from "./mesocycle.routes";
import microcycleRoutes from "./microcycle.routes";
import authMiddleware from "../middleware/auth.middleware";

const router = Router();

router.use("/auth", authRoutes);
router.use(authMiddleware);
router.use("/users", userRoutes.userRouter);
router.use("/users/settings", userRoutes.settingsRouter);
router.use("/routines", routineRoutes);
router.use("/exercises", exerciseRoutes);
router.use("/exercise-logs", exerciseLogRoutes);
router.use("/mesocycles", mesocycleRoutes);
router.use("/microcycles", microcycleRoutes);

export default router;

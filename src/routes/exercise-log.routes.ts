import { Router } from 'express';
import { ExerciseLogController } from '../controllers/exercise-log.controller';

const exerciseLogRouter = Router();

exerciseLogRouter.post('/', ExerciseLogController.createLog);
exerciseLogRouter.get('/exercise/:exerciseId', ExerciseLogController.getExerciseLogs);
exerciseLogRouter.get('/:id', ExerciseLogController.getLogById);
// Más rutas según necesites

export default exerciseLogRouter; 
import { Router } from 'express';
import UserController from '../controllers/user.controller';

const userRouter = Router();
const settingsRouter = Router();
const userController = new UserController();

userRouter.get('/', userController.getUsers);
userRouter.get('/:id', userController.getUserById);
userRouter.put('/:id', userController.updateUser);
userRouter.delete('/:id', userController.deleteUser);

settingsRouter.put('/language', userController.updateLanguage);

export default { userRouter, settingsRouter }; 
import { Router } from 'express';
import authMiddleware from '@shared/infra/http/middlewares/authMiddleware';
import UsersController from '../controllers/UsersController';

const usersRouter = Router();
const usersController = new UsersController();
import createUserServiceValidator from '../middlewares/CreateUserServiceValidator';

usersRouter.use(authMiddleware);

usersRouter.post('/', createUserServiceValidator, usersController.create);

export default usersRouter;
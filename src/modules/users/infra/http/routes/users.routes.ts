import { Router } from 'express';
import authMiddleware from '@shared/infra/http/middlewares/authMiddleware';
import UsersController from '../controllers/UsersController';

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.use(authMiddleware);

usersRouter.post('/', usersController.create);

export default usersRouter;
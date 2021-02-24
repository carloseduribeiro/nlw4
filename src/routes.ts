import { Router } from 'express';
import { UserController } from './controllers/UserController';

const router = Router();

// Criar um objeto da classe UserController;
const userController = new UserController();

// Define: http://localhot:3333/users
router.post('/users', userController.create);

export{ router };
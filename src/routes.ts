import { Router } from 'express';
import { SendMailController } from './controllers/SendMailController';
import { SurveyController } from './controllers/SurveyController';
import { UserController } from './controllers/UserController';

const router = Router();

// Cria os controllers:
const userController = new UserController();
const surveyController = new SurveyController();
const sendMailController = new SendMailController();


// --- USERS:
// POST: http://localhost:3333/users
router.post('/users', userController.create);


// --- SURVEYS:
// POST: http://localhost:3333/users
router.post('/surveys', surveyController.create);
// GET: http://localhost:3333/users
router.get('/surveys', surveyController.show);

// --- EMAIL:
// POST: http://localhost:3333/sandMail
router.post('/sendMail', sendMailController.execute);


export{ router };
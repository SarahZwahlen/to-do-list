import express from 'express';
import createUserController from './user/controllers/createUser.controller';
import logUserController from './user/controllers/logUser.controller';
import logOutController from './user/controllers/logOut.controller';
import createTaskController from './task/createTask.controller';

const router = express.Router();

//GET

router.get('/user/login', logUserController);
router.get('/user/logout', logOutController);

//POST
router.post('/task/create', createTaskController);
router.post('/user/create', createUserController);
//PUT

//DELETE

export default router;

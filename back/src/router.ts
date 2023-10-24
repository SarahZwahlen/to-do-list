import express from 'express';
import createUserController from './user/controllers/createUser.controller';
import logUserController from './user/controllers/logUser.controller';
import logOutController from './user/controllers/logOut.controller';
import createTaskController from './task/controllers/createTask.controller';
import deleteTaskController from './task/controllers/deleteTask.controller';

const router = express.Router();

//GET
router.get('/user/logout', logOutController);

//POST
router.post('/user/login', logUserController);
router.post('/task/create', createTaskController);
router.post('/user/create', createUserController);
//PUT

//DELETE
router.delete('/task/delete', deleteTaskController);

export default router;

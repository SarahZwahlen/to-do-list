import express from 'express';
import createUserController from './user/createUser/createUser.controller';
import logUserController from './user/logUser/logUser.controller';
import logOutController from './user/logOut/logOut.controller';
import createTaskController from './task/createTask/createTask.controller';
import deleteTaskController from './task/deleteTask/deleteTask.controller';
import getAllUserTasksController from './task/getAllUserTasks/getAllUserTasks.controller';

const router = express.Router();

//GET
router.get('/user/logout', logOutController);
router.get('/task/all-user-tasks', getAllUserTasksController);
router.get('/task/:taskid');

//POST
router.post('/user/login', logUserController);
router.post('/task/create', createTaskController);
router.post('/user/create', createUserController);
//PUT

//DELETE
router.delete('/task/delete', deleteTaskController);

export default router;

import express from 'express';
import createUserController from './user/createUser/createUser.controller';
import logUserController from './user/logUser/logUser.controller';
import logOutController from './user/logOut/logOut.controller';
import createTaskController from './task/createTask/createTask.controller';
import deleteTaskController from './task/deleteTask/deleteTask.controller';
import getAllUserTasksController from './task/getAllUserTasks/getAllUserTasks.controller';
import getTaskController from './task/getTask/getTask.controller';
import updateTaskController from './task/updateTask/updateTask.controller';
import deleteUserController from './user/deleteUser/deleteUser.controller';
import isUserLoggedController from './user/isLogged/isUserLogged.controller';

const router = express.Router();

//GET
router.get('/user/logout', logOutController);
router.get('/task/all-user-tasks', getAllUserTasksController);
router.get('/task/unique/:taskId', getTaskController);
router.get('/user/is-logged', isUserLoggedController);

//POST
router.post('/user/login', logUserController);
router.post('/task/create', createTaskController);
router.post('/user/create', createUserController);

//PUT
router.put('/task', updateTaskController);

//DELETE
router.delete('/task/delete', deleteTaskController);
router.delete('/user', deleteUserController);

export default router;

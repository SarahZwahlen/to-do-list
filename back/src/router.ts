import express from 'express';
import createTaskController from './task/createTask.controller';
import createUserController from './user/controllers/createUser.controller';

const router = express.Router();

//GET

//POST
router.post('/task/create', createTaskController);
router.post('/user/create', createUserController);
//PUT

//DELETE

export default router;

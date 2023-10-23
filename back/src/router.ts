import express from 'express';
import createTaskController from './controllers/task/createTask.controller';

const router = express.Router();

router.post('/task/create', createTaskController);

export default router;

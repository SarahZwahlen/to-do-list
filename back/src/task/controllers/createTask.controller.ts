import { Request, Response } from 'express';
import createTaskUseCase from '../useCases/createTask.usecase';
import userReponsitoryMongo from '../../user/userRepository.mongo';
import taskReponsitoryMongo from '../taskRepository.mongo';

const createTaskController = async (req: Request, res: Response) => {
    const userSession = req.session.user;
    const body = req.body;

    if (!userSession) {
        return res.status(401).json({ message: 'You are not authenticated' });
    }

    if (!body.title) {
        return res.status(400).json({ message: 'A task must have a title' });
    }

    try {
        const newTask = await createTaskUseCase(
            body,
            userSession.id,
            taskReponsitoryMongo,
            userReponsitoryMongo
        );

        return res.status(200).json({ message: 'Task created', data: newTask });
    } catch (error) {
        console.log('error', error);
        return res.status(400).json({ message: 'An error occured', error });
    }
};

export default createTaskController;

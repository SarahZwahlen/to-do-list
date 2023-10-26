import { Request, Response } from 'express';
import addTaskUseCase from './addTask.usecase';
import taskRepositoryMongo from '../../infrastructure/repositories/taskRepository.mongo';
import taskListRepositoryMongo from '../../infrastructure/repositories/taskListRepository.mongo';
import userRepositoryMongo from '../../infrastructure/repositories/userRepository.mongo';

const addTaskController = async (req: Request, res: Response) => {
    const userSession = req.session.user;
    const body = req.body;

    if (!userSession) {
        return res.status(401).json({ message: 'You are not authenticated' });
    }

    if (!body.taskListId) {
        return res.status(400).json({ message: 'An element is missing' });
    }

    if (!body.title) {
        return res.status(400).json({ message: 'A task must have a title' });
    }

    try {
        const result = await addTaskUseCase(
            body.taskListId,
            {
                title: body.title,
                description: body.description
            },
            userSession.id,
            taskRepositoryMongo,
            taskListRepositoryMongo,
            userRepositoryMongo
        );
        return res.status(200).json({
            message: 'Task has been added',
            data: result
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: 'An error occured', error });
    }
};

export default addTaskController;

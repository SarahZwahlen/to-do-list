import { Request, Response } from 'express';
import { Task } from '../../infrastructure/models/task.model';
import updateTaskUseCase from './updateTask.usecase';
import userRepositoryMongo from '../../infrastructure/repositories/userRepository.mongo';
import taskRepositoryMongo from '../../infrastructure/repositories/taskRepository.mongo';

const updateTaskController = async (req: Request, res: Response) => {
    const userSession = req.session.user;
    const body: Partial<Pick<Task, 'description' | 'title' | 'isCompleted'>> &
        Pick<Task, 'id'> = req.body;

    if (!userSession) {
        return res.status(401).json({ message: 'You are not authenticated' });
    }

    try {
        const updatedTask = await updateTaskUseCase(
            userSession.id,
            body,
            userRepositoryMongo,
            taskRepositoryMongo
        );

        return res
            .status(200)
            .json({ message: 'Task has been updated', data: updatedTask });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: 'An error occured', error });
    }
};
export default updateTaskController;

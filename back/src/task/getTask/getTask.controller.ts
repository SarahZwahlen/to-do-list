import { Request, Response } from 'express';
import getTaskUseCase from './getTask.usecase';
import userRepositoryMongo from '../../infrastructure/repositories/userRepository.mongo';
import taskRepositoryMongo from '../../infrastructure/repositories/taskRepository.mongo';

const getTaskController = async (req: Request, res: Response) => {
    const user = req.session.user;
    const { taskId } = req.params;

    if (!user) {
        return res.status(401).json({ message: 'You are not authenticated' });
    }

    try {
        const task = await getTaskUseCase(
            taskId,
            user.id,
            userRepositoryMongo,
            taskRepositoryMongo
        );

        return res
            .status(200)
            .json({ message: `Task ${task.title}`, data: task });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: 'An error occured', error });
    }
};

export default getTaskController;

import { Request, Response } from 'express';
import getAllUserTasksUseCase from '../useCases/getAllUserTasks.usecase';
import userRepositoryMongo from '../../user/userRepository.mongo';
import taskRepositoryMongo from '../taskRepository.mongo';

const getAllUserTasksController = async (req: Request, res: Response) => {
    const userSession = req.session.user;

    if (!userSession) {
        return res.status(401).json({ message: 'You are not authenticated' });
    }

    try {
        const tasks = await getAllUserTasksUseCase(
            userSession.id,
            userRepositoryMongo,
            taskRepositoryMongo
        );

        return res.status(200).json({
            message: `Tasks of ${userSession.firstname} ${userSession.surname}`,
            data: tasks
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: 'An error occured', error });
    }
};

export default getAllUserTasksController;

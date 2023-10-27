import { Request, Response } from 'express';
import getAllUserTaskListsUseCase from './getAllUserTaskLists.usecase';
import userRepositoryMongo from '../../infrastructure/repositories/userRepository.mongo';
import taskListRepositoryMongo from '../../infrastructure/repositories/taskListRepository.mongo';

const getAllUserTaskListsController = async (req: Request, res: Response) => {
    const userSession = req.session.user;

    if (!userSession) {
        return res.status(401).json({ message: 'You are not authenticated' });
    }

    try {
        const taskLists = await getAllUserTaskListsUseCase(
            userSession.id,
            userRepositoryMongo,
            taskListRepositoryMongo
        );

        return res
            .status(200)
            .json({ message: 'There are all the task lists', data: taskLists });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: 'An error occured', error });
    }
};

export default getAllUserTaskListsController;

import { Request, Response } from 'express';
import getTasksOfTaskListUseCase from './getTasksOfTaskList.usecase';
import userRepositoryMongo from '../../infrastructure/repositories/userRepository.mongo';
import taskListRepositoryMongo from '../../infrastructure/repositories/taskListRepository.mongo';
const getTasksOfTaskListController = async (req: Request, res: Response) => {
    const userSession = req.session.user;
    const { taskListId } = req.params;

    if (!userSession) {
        return res.status(401).json({ message: 'You are not authenticated' });
    }

    if (!taskListId) {
        return res.status(400).json({ message: 'There is not TaskListId' });
    }

    try {
        const tasks = await getTasksOfTaskListUseCase(
            userSession.id,
            taskListId,
            userRepositoryMongo,
            taskListRepositoryMongo
        );

        return res
            .status(200)
            .json({ message: 'Here are the tasks', data: tasks });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: 'An error occured', error });
    }
};

export default getTasksOfTaskListController;

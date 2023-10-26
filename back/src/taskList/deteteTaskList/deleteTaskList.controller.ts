import { Request, Response } from 'express';
import taskListRepositoryMongo from '../../infrastructure/repositories/taskListRepository.mongo';
import userRepositoryMongo from '../../infrastructure/repositories/userRepository.mongo';
import deleteTaskListUseCase from './deleteTaskList.usecase';

const deleteTaskListController = async (req: Request, res: Response) => {
    const userSession = req.session.user;
    const body = req.body;

    if (!userSession) {
        return res.status(401).json({ message: 'You are not authenticated' });
    }

    if (!body.taskListId) {
        return res.status(400).json({ message: 'There is not task list id' });
    }

    try {
        await deleteTaskListUseCase(
            userSession.id,
            body.taskListId,
            userRepositoryMongo,
            taskListRepositoryMongo
        );
        return res.status(200).json({ message: 'Task list has been deleted' });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: 'An error occured', error });
    }
};

export default deleteTaskListController;

import { Request, Response } from 'express';
import deleteTaskUseCase from '../useCases/deleteTask.usecase';
import taskReponsitoryMongo from '../taskRepository.mongo';
import userReponsitoryMongo from '../../user/userRepository.mongo';

const deleteTaskController = async (req: Request, res: Response) => {
    const userSession = req.session.user;
    const body = req.body;
    if (!userSession) {
        return res.status(401).json({ message: 'You are not authenticated' });
    }

    if (!body.taskId) {
        return res.status(400).json({ message: 'There is no task id' });
    }
    
    try {
        await deleteTaskUseCase(
            body.taskId,
            userSession.id,
            taskReponsitoryMongo,
            userReponsitoryMongo
        );
        return res.status(200).json({ message: 'Task has been deleted' });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: 'An error occured', error });
    }
};

export default deleteTaskController;

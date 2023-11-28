import { Request, Response } from 'express';
import deleteTaskUseCase from './deleteTask.usecase';
import taskRepositoryMongo from '../../infrastructure/repositories/taskRepository.mongo';
import userRepositoryMongo from '../../infrastructure/repositories/userRepository.mongo';
import Ajv, { JSONSchemaType } from 'ajv';

const deleteTaskController = async (req: Request, res: Response) => {
    const userSession = req.session.user;
    const body = req.body;

    const ajv = new Ajv();

    const bodySchema: JSONSchemaType<{ taskId: string }> = {
        type: 'object',
        properties: {
            taskId: { type: 'string' }
        },
        required: ['taskId']
    };

    const validate = ajv.compile(bodySchema);

    if (!userSession) {
        return res.status(401).json({ message: 'You are not authenticated' });
    }

    if (!validate(body)) {
        return res.status(400).json({ message: 'There is no task id' });
    }

    try {
        await deleteTaskUseCase(
            body.taskId,
            userSession.id,
            taskRepositoryMongo,
            userRepositoryMongo
        );
        return res.status(200).json({ message: 'Task has been deleted' });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: 'An error occured', error });
    }
};

export default deleteTaskController;

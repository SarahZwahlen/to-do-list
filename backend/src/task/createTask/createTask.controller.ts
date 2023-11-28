import { Request, Response } from 'express';
import createTaskUseCase from './createTask.usecase';
import userRepositoryMongo from '../../infrastructure/repositories/userRepository.mongo';
import taskRepositoryMongo from '../../infrastructure/repositories/taskRepository.mongo';
import Ajv, { JSONSchemaType } from 'ajv';

const createTaskController = async (req: Request, res: Response) => {
    const userSession = req.session.user;
    const body = req.body;

    const ajv = new Ajv();

    interface TaskSchema {
        title: string;
        description?: string;
    }

    const bodySchema: JSONSchemaType<TaskSchema> = {
        type: 'object',
        properties: {
            title: { type: 'string' },
            description: { type: 'string', nullable: true }
        },
        required: ['title']
    };

    const validate = ajv.compile(bodySchema);

    if (!userSession) {
        return res.status(401).json({ message: 'You are not authenticated' });
    }

    if (!validate(body)) {
        return res.status(400).json({ message: 'A task must have a title' });
    }

    try {
        const newTask = await createTaskUseCase(
            body,
            userSession.id,
            taskRepositoryMongo,
            userRepositoryMongo
        );

        return res.status(200).json({ message: 'Task created', data: newTask });
    } catch (error) {
        console.log('error', error);
        return res.status(400).json({ message: 'An error occured', error });
    }
};

export default createTaskController;

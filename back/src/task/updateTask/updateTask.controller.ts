import { Request, Response } from 'express';
import { Task } from '../../infrastructure/models/task.model';
import updateTaskUseCase from './updateTask.usecase';
import userRepositoryMongo from '../../infrastructure/repositories/userRepository.mongo';
import taskRepositoryMongo from '../../infrastructure/repositories/taskRepository.mongo';
import Ajv, { JSONSchemaType } from 'ajv';

const updateTaskController = async (req: Request, res: Response) => {
    const userSession = req.session.user;
    const body: Partial<Pick<Task, 'description' | 'title' | 'isCompleted'>> &
        Pick<Task, 'id'> = req.body;

    const ajv = new Ajv();

    interface UpdateTaskData {
        id: string;
        description?: string;
        title?: string;
        isCompleted?: boolean;
    }

    const bodySchema: JSONSchemaType<UpdateTaskData> = {
        type: 'object',
        properties: {
            description: { type: 'string', nullable: true },
            title: { type: 'string', nullable: true },
            isCompleted: { type: 'boolean', nullable: true },
            id: { type: 'string' }
        },
        required: ['id']
    };

    const validate = ajv.compile(bodySchema);

    if (!userSession) {
        return res.status(401).json({ message: 'You are not authenticated' });
    }

    if (!validate(body)) {
        return res.status(400).json({ message: 'An id is missing' });
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

import { Request, Response } from 'express';
import addTaskUseCase from './addTask.usecase';
import taskRepositoryMongo from '../../infrastructure/repositories/taskRepository.mongo';
import taskListRepositoryMongo from '../../infrastructure/repositories/taskListRepository.mongo';
import userRepositoryMongo from '../../infrastructure/repositories/userRepository.mongo';
import Ajv, { JSONSchemaType } from 'ajv';

const addTaskController = async (req: Request, res: Response) => {
    const userSession = req.session.user;
    const body = req.body;

    const ajv = new Ajv();

    interface AddTaskData {
        taskListId: string;
        title: string;
        description?: string;
    }

    const bodySchema: JSONSchemaType<AddTaskData> = {
        type: 'object',
        properties: {
            taskListId: { type: 'string' },
            title: { type: 'string' },
            description: { type: 'string', nullable: true }
        },
        required: ['taskListId', 'title']
    };

    const validate = ajv.compile(bodySchema);

    if (!userSession) {
        return res.status(401).json({ message: 'You are not authenticated' });
    }

    if (!validate(body)) {
        return res
            .status(400)
            .json({ message: 'A task title or the task list id is missing' });
    }

    try {
        const result = await addTaskUseCase(
            body.taskListId,
            {
                title: body.title,
                description: body.description
            },
            userSession.id,
            taskRepositoryMongo,
            taskListRepositoryMongo,
            userRepositoryMongo
        );
        return res.status(200).json({
            message: 'Task has been added',
            data: result
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: 'An error occured', error });
    }
};

export default addTaskController;

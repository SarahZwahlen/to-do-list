import { Request, Response } from 'express';
import createTaskListUseCase from './createTaskList.usecase';
import userRepositoryMongo from '../../infrastructure/repositories/userRepository.mongo';
import taskListRepositoryMongo from '../../infrastructure/repositories/taskListRepository.mongo';
import Ajv, { JSONSchemaType } from 'ajv';

const createTaskListController = async (req: Request, res: Response) => {
    const userSession = req.session.user;
    const body = req.body;

    const ajv = new Ajv();

    interface NewTaskList {
        title: string;
        description?: string;
    }

    const bodySchema: JSONSchemaType<NewTaskList> = {
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
        return res.status(400).json({ message: 'A title is required' });
    }

    try {
        const newTaskList = await createTaskListUseCase(
            userSession.id,
            body,
            userRepositoryMongo,
            taskListRepositoryMongo
        );
        return res.status(200).json({
            message: 'Task list created',
            data: {
                title: newTaskList?.title,
                description: newTaskList?.description,
                id: newTaskList?.id,
                tasks: []
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: 'An error occured', error });
    }
};

export default createTaskListController;

import { randomUUID } from 'crypto';
import { Task } from '../../infrastructure/models/task.model';
import userBuilder from './user.buider';
import { User } from '../../infrastructure/models/user.model';

const taskBuilder = (taskData: Partial<Task>, owner?: User) => {
    const newOwner = owner ? owner : userBuilder({});
    const newTask: Task = {
        id: randomUUID(),
        owner: newOwner,
        title: 'Nouvelle tâche',
        description: 'Voici une description',
        ...taskData
    };

    return newTask;
};

export default taskBuilder;

import { randomUUID } from 'crypto';
import { Task } from '../../infrastructure/models/task.model';
import userBuilder from './user.buider';

const taskBuilder = (taskData: Partial<Task> = {}) => {
    const newTask: Task = {
        id: randomUUID(),
        owner: userBuilder(),
        title: 'Nouvelle tâche',
        description: 'Voici une description',
        isCompleted: false,
        ...taskData
    };

    return newTask;
};

export default taskBuilder;

import { randomUUID } from 'crypto';
import { Task } from '../infrastructure/models/task.model';
import { taskRepositoryInterface } from './taskRepository.interface';

const taskRepositoryInMemory: taskRepositoryInterface & {
    tasks: Task[];
    reset: () => void;
    giventExistingTask: (newTask: Task) => void;
} = {
    tasks: [],
    reset: function () {
        this.tasks = [];
    },
    giventExistingTask: function (newTask) {
        this.tasks.push(newTask);
    },
    createTask: async function (task, owner) {
        const newTask: Task = {
            ...task,
            id: randomUUID(),
            owner: owner
        };

        this.tasks.push(newTask);
    }
};

export default taskRepositoryInMemory;

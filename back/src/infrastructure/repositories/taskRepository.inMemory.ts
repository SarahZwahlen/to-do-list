import { randomUUID } from 'crypto';
import { Task } from '../models/task.model';
import { TaskRepositoryInterface } from '../persistence/taskRepository.interface';

const taskRepositoryInMemory: TaskRepositoryInterface & {
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
            title: task.title!,
            description: task.description ? task.description : null,
            id: randomUUID(),
            owner: owner
        };

        this.tasks.push(newTask);

        return newTask;
    },
    findById: async function (taskId) {
        const task = this.tasks.find((task) => task.id === taskId);
        return task ? task : null;
    },
    deleteTask: async function (taskId) {
        const newTasks = this.tasks.filter((task) => task.id !== taskId);
        this.tasks = newTasks;
    },
    getAllTasks: async function (userId) {
        return this.tasks.filter((task) => task.owner.id === userId);
    }
};

export default taskRepositoryInMemory;
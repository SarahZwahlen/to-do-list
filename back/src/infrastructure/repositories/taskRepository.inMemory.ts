import { randomUUID } from 'crypto';
import { Task } from '../models/task.model';
import { TaskRepositoryInterface } from '../persistence/taskRepository.interface';

const taskRepositoryInMemory: TaskRepositoryInterface & {
    tasks: Task[];
    reset: () => void;
    givenExistingTask: (newTask: Task) => void;
} = {
    tasks: [],
    reset: function () {
        this.tasks = [];
    },
    givenExistingTask: function (newTask) {
        this.tasks.push(newTask);
    },
    createTask: async function (task, owner) {
        const newTask: Task = {
            title: task.title!,
            description: task.description ? task.description : null,
            id: randomUUID(),
            owner: owner,
            isCompleted: task.isCompleted ? task.isCompleted : false
        };

        this.tasks.push(newTask);

        return newTask;
    },
    findById: async function (taskId) {
        const task = this.tasks.find((task) => task.id === taskId);
        return task ? task : null;
    },
    deleteTask: async function (task) {
        const newTasks = this.tasks.filter((e) => e.id !== task.id);
        this.tasks = newTasks;
    },
    getAllTasks: async function (userId) {
        return this.tasks.filter((task) => task.owner.id === userId);
    },
    updateTask: async function (data) {
        const currentTask = this.tasks.find((task) => task.id === data.id);

        const taskIndex = this.tasks.indexOf(currentTask!);

        this.tasks[taskIndex] = { ...currentTask!, ...data };

        return this.tasks[taskIndex];
    }
};

export default taskRepositoryInMemory;

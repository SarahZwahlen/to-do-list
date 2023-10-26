import { randomUUID } from 'crypto';
import { TaskList } from '../models/taskList.model';
import { TaskListReposirotyInterface } from '../persistence/taskListRepository.interface';
import taskRepositoryInMemory from './taskRepository.inMemory';
import { Task } from '../models/task.model';

const taskListRepositoryInMemory: TaskListReposirotyInterface & {
    taskLists: TaskList[];
    reset: () => void;
    givenExistingTaskList: (taskList: TaskList) => void;
} = {
    taskLists: [],
    reset: function () {
        this.taskLists = [];
    },
    givenExistingTaskList: function (taskList) {
        this.taskLists.push(taskList);
    },
    createTaskList: async function (data, user) {
        const newTaskList: TaskList = {
            id: randomUUID(),
            owner: user,
            tasks: [],
            title: data.title!,
            description: data.description ? data.description : null
        };
        this.taskLists.push(newTaskList);
        return newTaskList;
    },
    findById: async function (taskListId) {
        const taskList = this.taskLists.find(
            (taskList) => taskList.id === taskListId
        );

        return taskList ? taskList : null;
    },
    delete: async function (taskListId) {
        const taskList = await this.findById(taskListId);
        if (taskList?.tasks) {
            const tasks = taskList?.tasks;
            const tasksId = tasks.map((task: Task) => task.id);

            taskRepositoryInMemory.tasks = taskRepositoryInMemory.tasks.filter(
                (task) => !tasksId.includes(task.id)
            );
        }
    
        this.taskLists = this.taskLists.filter(
            (taskList) => taskList.id !== taskListId
        );
    }
};

export default taskListRepositoryInMemory;

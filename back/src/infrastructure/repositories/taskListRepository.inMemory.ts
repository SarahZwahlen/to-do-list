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
    },
    addTask: async function (taskListId, task) {
        const taskList = this.taskLists.find(
            (taskList: TaskList) => taskList.id === taskListId
        );

        const taskListIndex = this.taskLists.indexOf(taskList!);

        if (
            !this.taskLists[taskListIndex].tasks ||
            this.taskLists[taskListIndex].tasks?.length === 0
        ) {
            this.taskLists[taskListIndex].tasks = [task];
        } else {
            this.taskLists[taskListIndex].tasks?.push(task);
        }
        return this.taskLists[taskListIndex];
    },
    getAllUserTaskList: async function (user) {
        return this.taskLists.filter(
            (taskList) => taskList.owner.id === user.id
        );
    },
    getAllTasksOfTaskList: async function (taskListId) {
        const result = this.taskLists.find(
            (taskList) => taskList.id === taskListId
        );

        return result ? result : null;
    }
};

export default taskListRepositoryInMemory;

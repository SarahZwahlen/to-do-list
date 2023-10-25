import { randomUUID } from 'crypto';
import { TaskList } from '../models/taskList.model';
import { TaskListReposirotyInterface } from '../persistence/taskListRepository.interface';

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
    }
};

export default taskListRepositoryInMemory;

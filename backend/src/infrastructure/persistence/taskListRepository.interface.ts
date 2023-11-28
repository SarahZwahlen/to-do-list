import { Task } from '../models/task.model';
import { TaskList } from '../models/taskList.model';
import { User } from '../models/user.model';

type TaskListReposirotyInterface = {
    createTaskList: (
        data: Partial<Pick<TaskList, 'description' | 'title'>>,
        user: User
    ) => Promise<TaskList | null>;
    findById: (taskListId: string) => Promise<TaskList | null>;
    delete: (taskListId: string) => Promise<void>;
    addTask: (taskListId: string, task: Task) => Promise<TaskList | null>;
    getAllUserTaskList: (user: User) => Promise<TaskList[] | null>;
    getAllTasksOfTaskList: (taskListId: string) => Promise<TaskList | null>;
};

export type { TaskListReposirotyInterface };

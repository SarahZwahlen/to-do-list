import { TaskList } from '../models/taskList.model';
import { User } from '../models/user.model';

type TaskListReposirotyInterface = {
    createTaskList: (
        data: Partial<Pick<TaskList, 'description' | 'title'>>,
        user: User
    ) => Promise<TaskList | null>;
    findById: (taskListId: string) => Promise<TaskList | null>;
    delete: (taskListId: string) => Promise<void>;
};

export type { TaskListReposirotyInterface };

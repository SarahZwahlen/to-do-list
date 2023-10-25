import { TaskList } from '../models/taskList.model';
import { User } from '../models/user.model';

type TaskListReposirotyInterface = {
    createTaskList: (
        data: Partial<Pick<TaskList, 'description' | 'title'>>,
        user: User
    ) => Promise<TaskList | null>;
};

export type { TaskListReposirotyInterface };

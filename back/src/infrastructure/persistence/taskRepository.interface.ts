import { Task } from '../models/task.model';
import { User } from '../models/user.model';

type TaskRepositoryInterface = {
    createTask: (
        data: Partial<Pick<Task, 'title' | 'description'>>,
        owner: User
    ) => Promise<Task | null>;
    findById: (taskId: string) => Promise<Task | null>;
    deleteTask: (taskId: string) => Promise<void>;
    getAllTasks: (userId: string) => Promise<Task[] | null>;
};

export type { TaskRepositoryInterface };

import { Task } from '../models/task.model';
import { User } from '../models/user.model';

type TaskRepositoryInterface = {
    createTask: (
        data: Partial<Pick<Task, 'title' | 'description' | 'isCompleted'>>,
        owner: User
    ) => Promise<Task | null>;
    findById: (taskId: string) => Promise<Task | null>;
    deleteTask: (task: Task) => Promise<void>;
    getAllTasks: (userId: string) => Promise<Task[] | null>;
    updateTask: (
        data: Partial<Pick<Task, 'description' | 'title' | 'isCompleted'>> &
            Pick<Task, 'id'>
    ) => Promise<Task | null>;
};

export type { TaskRepositoryInterface };

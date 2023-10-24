import { Task } from '../infrastructure/models/task.model';
import { User } from '../infrastructure/models/user.model';

type TaskRepositoryInterface = {
    createTask: (
        data: Partial<Pick<Task, 'title' | 'description'>>,
        owner: User
    ) => Promise<Task | null>;
};

export type { TaskRepositoryInterface };

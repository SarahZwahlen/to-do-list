import { Task } from '../infrastructure/models/task.model';
import { User } from '../infrastructure/models/user.model';

type taskRepositoryInterface = {
    createTask: (
        data: Pick<Task, 'title' | 'description'>,
        owner: User
    ) => Promise<void>;
};

export type { taskRepositoryInterface };

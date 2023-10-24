import { Task } from '../../infrastructure/models/task.model';
import { UserRepositoryInterface } from '../../user/userRepository.interface';
import { TaskRepositoryInterface } from '../taskRepository.interface';

const createTaskUseCase = async (
    data: Partial<Pick<Task, 'title' | 'description'>>,
    userId: string,
    taskRepo: TaskRepositoryInterface,
    userRepo: UserRepositoryInterface
) => {
    const user = await userRepo.findById(userId);

    if (!user) {
        throw new Error('User does not exists in database');
    }

    return await taskRepo.createTask(data, user);
};

export default createTaskUseCase;

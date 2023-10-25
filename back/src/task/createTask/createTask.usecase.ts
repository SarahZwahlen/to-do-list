import { Task } from '../../infrastructure/models/task.model';
import { UserRepositoryInterface } from '../../infrastructure/persistence/userRepository.interface';
import { TaskRepositoryInterface } from '../../infrastructure/persistence/taskRepository.interface';
import checkUserExistence from '../../tooling/validators/checkUserExistence';

const createTaskUseCase = async (
    data: Partial<Pick<Task, 'title' | 'description'>>,
    userId: string,
    taskRepo: TaskRepositoryInterface,
    userRepo: UserRepositoryInterface
) => {
    const user = await checkUserExistence(userId, userRepo);

    return await taskRepo.createTask(data, user);
};

export default createTaskUseCase;

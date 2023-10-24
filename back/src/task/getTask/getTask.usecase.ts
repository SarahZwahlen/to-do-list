import { Task } from '../../infrastructure/models/task.model';
import { TaskRepositoryInterface } from '../../infrastructure/persistence/taskRepository.interface';
import { UserRepositoryInterface } from '../../infrastructure/persistence/userRepository.interface';

const getTaskUseCase = async (
    taskId: string,
    userId: string,
    userRepo: UserRepositoryInterface,
    taskRepo: TaskRepositoryInterface
): Promise<Task> => {
    const user = await userRepo.findById(userId);

    if (!user) {
        throw new Error('This user does not exists');
    }
    const task = await taskRepo.findById(taskId);

    if (task?.owner.id !== user.id) {
        throw new Error(`You are not the task owner`);
    }
    return task;
};
export default getTaskUseCase;

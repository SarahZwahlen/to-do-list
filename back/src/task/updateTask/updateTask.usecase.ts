import { Task } from '../../infrastructure/models/task.model';
import { TaskRepositoryInterface } from '../../infrastructure/persistence/taskRepository.interface';
import { UserRepositoryInterface } from '../../infrastructure/persistence/userRepository.interface';
import checkUserExistence from '../../tooling/validators/checkUserExistence';

const updateTaskUseCase = async (
    userId: string,
    data: Partial<Task> & Pick<Task, 'id'>,
    userRepo: UserRepositoryInterface,
    taskRepo: TaskRepositoryInterface
) => {
    await checkUserExistence(userId, userRepo);

    const task = await taskRepo.findById(data.id);
    if (!task) {
        throw new Error('This task does not exists in database');
    }

    if (task.owner.id !== userId) {
        throw new Error('You are not the task owner');
    }
    return await taskRepo.updateTask(data);
};
export default updateTaskUseCase;

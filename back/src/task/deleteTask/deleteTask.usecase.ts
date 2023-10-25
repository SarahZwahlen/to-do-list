import { UserRepositoryInterface } from '../../infrastructure/persistence/userRepository.interface';
import { TaskRepositoryInterface } from '../../infrastructure/persistence/taskRepository.interface';
import checkUserExistence from '../../tooling/validators/checkUserExistence';

const deleteTaskUseCase = async (
    taskId: string,
    userId: string,
    taskRepo: TaskRepositoryInterface,
    userRepo: UserRepositoryInterface
) => {
    const user = await checkUserExistence(userId, userRepo);

    const task = await taskRepo.findById(taskId);
    if (!task) {
        throw new Error('Task does not exists in database.');
    }

    if (task.owner.id !== user.id) {
        throw new Error('You are not the task owner');
    }

    await taskRepo.deleteTask(task.id);
};

export default deleteTaskUseCase;

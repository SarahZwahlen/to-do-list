import { UserRepositoryInterface } from '../../user/userRepository.interface';
import { TaskRepositoryInterface } from '../taskRepository.interface';

const deleteTaskUseCase = async (
    taskId: string,
    userId: string,
    taskRepo: TaskRepositoryInterface,
    userRepo: UserRepositoryInterface
) => {
    const user = await userRepo.findById(userId);

    if (!user) {
        throw new Error('User does not exists in database.');
    }

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

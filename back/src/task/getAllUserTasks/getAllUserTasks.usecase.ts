import { UserRepositoryInterface } from '../../infrastructure/persistence/userRepository.interface';
import { TaskRepositoryInterface } from '../../infrastructure/persistence/taskRepository.interface';

const getAllUserTasksUseCase = async (
    userdId: string,
    userRepo: UserRepositoryInterface,
    taskRepo: TaskRepositoryInterface
) => {
    const user = await userRepo.findById(userdId);

    if (!user) {
        throw new Error('This user does not exists in database');
    }

    return await taskRepo.getAllTasks(user.id);
};

export default getAllUserTasksUseCase;
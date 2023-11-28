import { UserRepositoryInterface } from '../../infrastructure/persistence/userRepository.interface';
import { TaskRepositoryInterface } from '../../infrastructure/persistence/taskRepository.interface';
import checkUserExistence from '../../tooling/validators/checkUserExistence';

const getAllUserTasksUseCase = async (
    userdId: string,
    userRepo: UserRepositoryInterface,
    taskRepo: TaskRepositoryInterface
) => {
    const user = await checkUserExistence(userdId, userRepo);

    return await taskRepo.getAllTasks(user.id);
};

export default getAllUserTasksUseCase;

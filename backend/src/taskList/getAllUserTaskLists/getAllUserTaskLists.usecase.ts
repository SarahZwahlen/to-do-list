import { TaskListReposirotyInterface } from '../../infrastructure/persistence/taskListRepository.interface';
import { UserRepositoryInterface } from '../../infrastructure/persistence/userRepository.interface';
import checkUserExistence from '../../tooling/validators/checkUserExistence';

const getAllUserTaskListsUseCase = async (
    userId: string,
    userRepo: UserRepositoryInterface,
    taskListRepo: TaskListReposirotyInterface
) => {
    const user = await checkUserExistence(userId, userRepo);

    const taskLists = await taskListRepo.getAllUserTaskList(user);

    return taskLists;
};

export default getAllUserTaskListsUseCase;

import { TaskListReposirotyInterface } from '../../infrastructure/persistence/taskListRepository.interface';
import { UserRepositoryInterface } from '../../infrastructure/persistence/userRepository.interface';
import checkTaskListExistence from '../../tooling/validators/checkTaskListExistence';
import checkUserExistence from '../../tooling/validators/checkUserExistence';

const getTasksOfTaskListUseCase = async (
    userId: string,
    taskListId: string,
    userRepo: UserRepositoryInterface,
    taskListRepo: TaskListReposirotyInterface
) => {
    await checkUserExistence(userId, userRepo);
    await checkTaskListExistence(taskListId, taskListRepo);

    return await taskListRepo.getAllTasksOfTaskList(taskListId);
};

export default getTasksOfTaskListUseCase;

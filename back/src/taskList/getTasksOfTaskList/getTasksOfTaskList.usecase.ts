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
    const user = await checkUserExistence(userId, userRepo);
    const taskList = await checkTaskListExistence(taskListId, taskListRepo);

    if (taskList.owner.id !== userId) {
        throw new Error('You are not the task list owner');
    }

    return await taskListRepo.getAllTasksOfTaskList(taskListId);
};

export default getTasksOfTaskListUseCase;

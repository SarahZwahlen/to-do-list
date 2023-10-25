import { TaskList } from '../infrastructure/models/taskList.model';
import { TaskListReposirotyInterface } from '../infrastructure/persistence/taskListRepository.interface';
import { UserRepositoryInterface } from '../infrastructure/persistence/userRepository.interface';
import checkUserExistence from '../tooling/validators/checkUserExistence';

const createTaskListUseCase = async (
    userId: string,
    data: Partial<TaskList>,
    userRepo: UserRepositoryInterface,
    taskListRepo: TaskListReposirotyInterface
) => {
    const user = await checkUserExistence(userId, userRepo);

    return await taskListRepo.createTaskList(data, user);
};

export default createTaskListUseCase;

import { TaskListReposirotyInterface } from '../../infrastructure/persistence/taskListRepository.interface';
import { UserRepositoryInterface } from '../../infrastructure/persistence/userRepository.interface';
import checkUserExistence from '../../tooling/validators/checkUserExistence';

const deleteTaskListUseCase = async (
    userId: string,
    taskListId: string,
    userRepo: UserRepositoryInterface,
    taskListRepo: TaskListReposirotyInterface
) => {
    console.log('user id', userId);
    await checkUserExistence(userId, userRepo);
    const taskList = await taskListRepo.findById(taskListId);

    if (!taskList) {
        throw new Error('This task list does not exists in database');
    }

    await taskListRepo.delete(taskListId);
};

export default deleteTaskListUseCase;

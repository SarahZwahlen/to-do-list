import { Task } from '../../infrastructure/models/task.model';
import { TaskListReposirotyInterface } from '../../infrastructure/persistence/taskListRepository.interface';
import { TaskRepositoryInterface } from '../../infrastructure/persistence/taskRepository.interface';
import { UserRepositoryInterface } from '../../infrastructure/persistence/userRepository.interface';
import checkTaskListExistence from '../../tooling/validators/checkTaskListExistence';
import checkUserExistence from '../../tooling/validators/checkUserExistence';

const addTaskUseCase = async (
    taskListId: string,
    taskData: Partial<Pick<Task, 'title' | 'description'>>,
    userId: string,
    taskRepo: TaskRepositoryInterface,
    taskListRepo: TaskListReposirotyInterface,
    userRepo: UserRepositoryInterface
) => {
    const user = await checkUserExistence(userId, userRepo);
    await checkTaskListExistence(taskListId, taskListRepo);
    const task = await taskRepo.createTask(taskData, user);

    const updatedTaskList = await taskListRepo.addTask(taskListId, task!);
    return { task, taskList: updatedTaskList };
};

export default addTaskUseCase;

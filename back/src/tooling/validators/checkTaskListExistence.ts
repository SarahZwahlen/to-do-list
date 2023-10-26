import { TaskListReposirotyInterface } from '../../infrastructure/persistence/taskListRepository.interface';

const checkTaskListExistence = async (
    taskListId: string,
    taskListRepo: TaskListReposirotyInterface
) => {
    const taskList = await taskListRepo.findById(taskListId);
    if (!taskList) {
        throw new Error('This task list does not exists');
    }
    return taskList;
};

export default checkTaskListExistence;

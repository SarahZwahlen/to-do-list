import { TaskRepositoryInterface } from '../../infrastructure/persistence/taskRepository.interface';

const checkTaskExistence = async (
    taskId: string,
    taskRepo: TaskRepositoryInterface
) => {
    const task = await taskRepo.findById(taskId);
    if (!task) {
        throw new Error('This task does not exists in database');
    }
    return task;
};

export default checkTaskExistence;

import TaskModel from '../infrastructure/models/task.model';
import { TaskRepositoryInterface } from './taskRepository.interface';

const taskReponsitoryMongo: TaskRepositoryInterface = {
    createTask: async (data, owner) => {
        const task = new TaskModel({ ...data, owner });

        await task.save();
        return task;
    }
};

export default taskReponsitoryMongo;

import TaskModel from '../infrastructure/models/task.model';
import { TaskRepositoryInterface } from './taskRepository.interface';

const taskReponsitoryMongo: TaskRepositoryInterface = {
    createTask: async (data, owner) => {
        const task = new TaskModel({ ...data, owner });

        await task.save();
        return task;
    },
    findById: async (taskId) => {
        return await TaskModel.findOne({ _id: taskId }).populate('owner');
    },
    deleteTask: async (taskId) => {
        await TaskModel.deleteOne({ _id: taskId });
    }
};

export default taskReponsitoryMongo;

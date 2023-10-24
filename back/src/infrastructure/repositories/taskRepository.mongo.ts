import TaskModel from '../models/task.model';
import { TaskRepositoryInterface } from '../persistence/taskRepository.interface';

const taskRepositoryMongo: TaskRepositoryInterface = {
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
    },
    getAllTasks: async (userId) => {
        return await TaskModel.find({ owner: userId });
    }
};

export default taskRepositoryMongo;

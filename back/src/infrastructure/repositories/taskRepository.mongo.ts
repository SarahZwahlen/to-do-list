import TaskModel, { Task } from '../models/task.model';
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
    },
    updateTask: async (data) => {
        const updateData: Partial<Task> = { ...data };
        delete updateData['id'];
        return await TaskModel.findOneAndUpdate({ _id: data.id }, updateData, {
            new: true
        });
    }
};

export default taskRepositoryMongo;

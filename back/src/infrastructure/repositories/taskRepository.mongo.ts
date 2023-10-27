import TaskModel, { Task } from '../models/task.model';
import TaskListModel from '../models/taskList.model';
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
    deleteTask: async (task) => {
        const taskList = await TaskListModel.findOne().populate({
            path: 'tasks',
            match: { id: task.id }
        });
        const theTask = await TaskModel.findOne({ _id: task });
        await TaskListModel.updateOne(
            { _id: taskList!.id },
            {
                $pull: {
                    tasks: theTask!._id
                }
            }
        );
        await TaskModel.deleteOne({ _id: task });
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

import TaskModel, { Task } from '../models/task.model';
import TaskListModel from '../models/taskList.model';
import { TaskListReposirotyInterface } from '../persistence/taskListRepository.interface';

const taskListRepositoryMongo: TaskListReposirotyInterface = {
    createTaskList: async (data, user) => {
        const newTaskList = new TaskListModel({
            ...data,
            owner: user
        });
        await newTaskList.save();
        return newTaskList;
    },
    findById: async (taskListId) => {
        return await TaskListModel.findOne({ _id: taskListId });
    },
    delete: async (taskListId) => {
        const taskList = await TaskListModel.findOne({
            _id: taskListId
        }).populate('tasks');

        if (taskList?.tasks) {
            const tasks = taskList.tasks;

            tasks.forEach(async (task: Task) => {
                await TaskModel.deleteOne({ _id: task.id });
            });
        }

        await TaskListModel.deleteOne({ _id: taskListId });
    },
    addTask: async (taskListId, task) => {
        return await TaskListModel.findOneAndUpdate(
            { _id: taskListId },
            {
                $push: {
                    tasks: task
                }
            }
        );
    },
    getAllUserTaskList: async (user) => {
        return await TaskListModel.find({ owner: user });
    }
};

export default taskListRepositoryMongo;

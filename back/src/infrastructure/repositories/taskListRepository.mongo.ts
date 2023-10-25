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
    }
};

export default taskListRepositoryMongo;

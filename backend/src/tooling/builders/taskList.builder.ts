import { randomUUID } from 'crypto';
import { TaskList } from '../../infrastructure/models/taskList.model';
import userBuilder from './user.buider';

const taskListBuilder = (data: Partial<TaskList> = {}) => {
    const newTaskList: TaskList = {
        id: randomUUID(),
        title: 'Task list title',
        description: 'Task list description',
        owner: userBuilder(),
        tasks: [],
        ...data
    };
    return newTaskList;
};

export default taskListBuilder;

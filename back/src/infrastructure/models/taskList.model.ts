import mongoose, { Schema, model } from 'mongoose';
import { Task } from './task.model';
import { User } from './user.model';

type TaskList = {
    id: string;
    title: string;
    description?: string | null;
    owner: User;
    tasks?: Task[];
};

const taskListSchema = new Schema<TaskList>(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        tasks: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Task',
            required: false
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },
    {
        timestamps: true
    }
);

const TaskListModel = model<TaskList>('TaskList', taskListSchema);

export type { TaskList };
export default TaskListModel;

import mongoose, { Schema, model } from 'mongoose';
import { Task } from './task.model';
import { User } from './user.model';

type TaskList = {
    id: string;
    title: string;
    description?: string | null;
    owner: User;
    tasks: Task[] | Task;
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
            default: []
        }
    },
    {
        timestamps: true
    }
);

const TaskListModel = model<TaskList>('TaskList', taskListSchema);

export type { TaskList };
export default TaskListModel;

import mongoose, { Schema, model } from 'mongoose';
import { User } from './user.model';

type Task = {
    id: string;
    title: string;
    description?: string | null;
    owner: User;
    state: 'to do' | 'in progress' | 'done';
};

const taskSchema = new Schema<Task>(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: false
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        state: {
            type: String,
            enum: ['to do', 'in progress', 'done'],
            default: 'to do'
        }
    },
    {
        timestamps: true
    }
);

const TaskModel = model<Task>('Task', taskSchema);

export type { Task };
export default TaskModel;

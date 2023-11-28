import mongoose, { Schema, model } from 'mongoose';
import { User } from './user.model';

type Task = {
    id: string;
    title: string;
    description?: string | null;
    owner: User;
    isCompleted: boolean;
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
        isCompleted: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

const TaskModel = model<Task>('Task', taskSchema);

export type { Task };
export default TaskModel;

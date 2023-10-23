import { Schema, model } from 'mongoose';

type User = {
    id: string;
    firstname: string;
    surname: string;
    email: string;
    password: string;
};

const userSchema = new Schema<User>(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        firstname: {
            type: String,
            required: true
        },
        surname: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);

const UserModel = model<User>('User', userSchema);

export type { User };
export default { UserModel };

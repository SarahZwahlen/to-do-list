import { User } from '../models/user.model';

type UserRepositoryInterface = {
    createUser: (data: Omit<User, 'id'> | User) => Promise<User>;
    logUser: (data: Pick<User, 'email' | 'password'>) => Promise<User | null>;
    findByEmail: (email: string) => Promise<User | null>;
    findById: (userId: string) => Promise<User | null>;
    deleteUser: (userId: string) => Promise<void>;
    updateUser: (
        data: Partial<
            Pick<User, 'email' | 'firstname' | 'password' | 'surname'>
        > &
            Pick<User, 'id'>
    ) => Promise<User | null>;
};

export type { UserRepositoryInterface };

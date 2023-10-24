import { User } from '../infrastructure/models/user.model';

type UserRepositoryInterface = {
    createUser: (data: User) => Promise<User>;
    logUser: (data: Pick<User, 'email' | 'password'>) => Promise<User | null>;
    findByEmail: (email: string) => Promise<User | null>;
    findById: (userId: string) => Promise<User | null>;
};

export type { UserRepositoryInterface };

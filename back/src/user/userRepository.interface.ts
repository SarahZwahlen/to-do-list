import { User } from '../infrastructure/models/user.model';

type UserRepositoryInterface = {
    createUser: (data: User) => Promise<User>;
    findByEmail: (email: string) => Promise<User | null>;
};

export type { UserRepositoryInterface };

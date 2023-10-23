import { User } from '../infrastructure/models/user.model';
import { UserRepositoryInterface } from './userRepository.interface';

const userRepositoryInMemory: UserRepositoryInterface & {
    users: User[];
    reset: () => void;
    givenExistingUser: (user: User) => void;
} = {
    users: [],
    reset: function () {
        this.users = [];
    },
    givenExistingUser: function (user) {
        this.users.push(user);
    },
    createUser: async function (data) {
        const newUser = {
            ...data
        };

        this.users.push(newUser);
        return newUser;
    },
    findByEmail: async function (email) {
        const user = this.users.find((user) => (user.email = email));
        return user ? user : null;
    }
};

export default userRepositoryInMemory;

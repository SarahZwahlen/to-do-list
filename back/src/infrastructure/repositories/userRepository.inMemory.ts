import { User } from '../models/user.model';
import { UserRepositoryInterface } from '../persistence/userRepository.interface';

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
    },
    findById: async function (userId) {
        const user = this.users.find((user) => user.id === userId);
        return user ? user : null;
    },
    logUser: async function (data) {
        const user = await this.findByEmail(data.email);

        return data.password === user?.password ? user : null;
    }
};

export default userRepositoryInMemory;
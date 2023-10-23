import { randomUUID } from 'crypto';
import { User } from '../../infrastructure/models/user.model';

const buildUser = (data: Partial<User>) => {
    const newUser = {
        id: randomUUID(),
        email: 'john@doe.com',
        firstname: 'John',
        surname: 'Doe',
        password: '123',
        ...data
    };

    return newUser;
};

export default buildUser;

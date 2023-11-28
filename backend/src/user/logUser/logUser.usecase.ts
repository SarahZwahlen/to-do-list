import { User } from '../../infrastructure/models/user.model';
import { UserRepositoryInterface } from '../../infrastructure/persistence/userRepository.interface';

const logUserUseCase = async (
    data: Pick<User, 'email' | 'password'>,
    userRepo: UserRepositoryInterface
): Promise<User> => {
    const user = await userRepo.findByEmail(data.email);

    if (!user) {
        throw new Error('User does not exists in database');
    }

    const loggedUser = await userRepo.logUser(data);
    if (loggedUser) {
        return user;
    } else {
        throw new Error('Password mismatch');
    }
};

export default logUserUseCase;

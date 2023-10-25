import { User } from '../../infrastructure/models/user.model';
import { UserRepositoryInterface } from '../../infrastructure/persistence/userRepository.interface';
import checkUserExistence from '../../tooling/validators/checkUserExistence';

const updateUserUseCase = async (
    userData: Partial<
        Pick<User, 'email' | 'firstname' | 'surname' | 'password'>
    > &
        Pick<User, 'id'>,
    userRepo: UserRepositoryInterface
): Promise<User | null> => {
    const user = await checkUserExistence(userData.id, userRepo);

    return await userRepo.updateUser(userData);
};

export default updateUserUseCase;

import { UserRepositoryInterface } from '../../infrastructure/persistence/userRepository.interface';
import checkUserExistence from '../../tooling/validators/checkUserExistence';

const deleteUserUseCase = async (
    userId: string,
    userRepo: UserRepositoryInterface
) => {
    await checkUserExistence(userId, userRepo);

    await userRepo.deleteUser(userId);
};

export default deleteUserUseCase;

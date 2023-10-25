import { UserRepositoryInterface } from '../../infrastructure/persistence/userRepository.interface';

const checkUserExistence = async (
    userId: string,
    userRepo: UserRepositoryInterface
) => {
    const user = await userRepo.findById(userId);
    if (!user) {
        throw new Error('This user does not exists in database');
    }

    return user;
};

export default checkUserExistence;

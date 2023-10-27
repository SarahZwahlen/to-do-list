import { User } from '../../infrastructure/models/user.model';
import emailValidator from '../../tooling/validators/email.validator';
import { UserRepositoryInterface } from '../../infrastructure/persistence/userRepository.interface';

const createUserUseCase = async (
    data: Omit<User, 'id'>,
    userRepo: UserRepositoryInterface
): Promise<Pick<User, 'email' | 'firstname' | 'id' | 'surname'>> => {
    const isEmailValid = emailValidator(data.email);

    if (!isEmailValid) {
        throw new Error('Email format is invalid');
    }

    const isEmailAlreadyUsed = await userRepo.findByEmail(data.email);
    if (isEmailAlreadyUsed) {
        throw new Error('Email is already used by an other user');
    }

    //Créer l'utilisateur
    const newUser = await userRepo.createUser(data);
    if (!newUser) {
        throw new Error('An error occured with user creation');
    }
    return newUser;
};

export default createUserUseCase;

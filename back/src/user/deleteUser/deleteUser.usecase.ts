import { UserRepositoryInterface } from '../../infrastructure/persistence/userRepository.interface';
import checkUserExistence from '../../tooling/validators/checkUserExistence';

const deleteUserUseCase = async (
    userId: string,
    userRepo: UserRepositoryInterface
) => {
    checkUserExistence(userId, userRepo);

    //Vérifier si le user exists en bdd
    //le supprimer
    //Penser à supprimer TOUTES les tâches reliées à ce user en même temps !
};

export default deleteUserUseCase;

import { Task } from '../../infrastructure/models/task.model';
import { UserRepositoryInterface } from '../../user/userRepository.interface';
import { taskRepositoryInterface } from '../taskRepository.interface';

const createTaskUseCase = async (
    data: Partial<Task>,
    userId: string,
    taskRepo: taskRepositoryInterface,
    userRepo: UserRepositoryInterface
) => {
    //Vérifier que le user existe en BDD
    const user = await userRepo.fingById(userId);

    if (!user) {
        throw new Error('User does not exists in database');
    }
    // Créer la tâche
};

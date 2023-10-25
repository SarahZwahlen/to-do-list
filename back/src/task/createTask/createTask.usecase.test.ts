import taskBuilder from '../../tooling/builders/task.builder';
import userBuilder from '../../tooling/builders/user.buider';
import userRepositoryInMemory from '../../infrastructure/repositories/userRepository.inMemory';
import taskRepositoryInMemory from '../../infrastructure/repositories/taskRepository.inMemory';
import createTaskUseCase from './createTask.usecase';

describe('User wants to create a new task', () => {
    beforeEach(() => userRepositoryInMemory.reset());
    beforeEach(() => taskRepositoryInMemory.reset());

    test('Happy path', async () => {
        //Given an existing user
        const userData = userBuilder();
        // User exists inawait taskRepo.createTask(data, user) database
        userRepositoryInMemory.givenExistingUser(userData);

        //Given new taskData
        const taskData = taskBuilder({ owner: userData });

        //create Data
        const createdTask = await createTaskUseCase(
            {
                title: taskData.title,
                description: taskData.description
            },
            userData.id,
            taskRepositoryInMemory,
            userRepositoryInMemory
        );
        taskData.id = createdTask!.id;

        expect(createdTask).toEqual(taskData);
    });

    test('User does not exists', async () => {
        //Givent a user that is not in data base
        const user = userBuilder();
        //Given task Data
        const taskData = taskBuilder({ owner: user });

        await expect(async () => {
            await createTaskUseCase(
                { title: taskData.title, description: taskData.description },
                user.id,
                taskRepositoryInMemory,
                userRepositoryInMemory
            );
        }).rejects.toThrow('This user does not exists in database');
    });
});

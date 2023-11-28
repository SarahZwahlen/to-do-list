import taskRepositoryInMemory from '../../infrastructure/repositories/taskRepository.inMemory';
import userRepositoryInMemory from '../../infrastructure/repositories/userRepository.inMemory';
import taskBuilder from '../../tooling/builders/task.builder';
import userBuilder from '../../tooling/builders/user.buider';
import deleteUserUseCase from './deleteUser.usecase';

describe('User wants to delete his account', () => {
    beforeEach(() => userRepositoryInMemory.reset());
    beforeEach(() => taskRepositoryInMemory.reset());

    test('Happy path', async () => {
        //Given a user that exists in databse
        const user = userBuilder();
        userRepositoryInMemory.givenExistingUser(user);

        //Given a task that exists in database and who is linked to the user
        const task = taskBuilder({ owner: user });
        taskRepositoryInMemory.givenExistingTask(task);

        await deleteUserUseCase(user.id, userRepositoryInMemory);
        expect(userRepositoryInMemory.users).not.toContain(user);
        expect(taskRepositoryInMemory.tasks).not.toContain(task);
    });

    test('User does not exists in database', async () => {
        //Given a user
        const user = userBuilder();

        //Given a task that exists in database and who is linked to the user
        const task = taskBuilder({ owner: user });
        taskRepositoryInMemory.givenExistingTask(task);

        expect(
            async () => await deleteUserUseCase(user.id, userRepositoryInMemory)
        ).rejects.toThrow('This user does not exists in database');
    });
});

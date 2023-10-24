import taskRepositoryInMemory from '../../infrastructure/repositories/taskRepository.inMemory';
import userRepositoryInMemory from '../../infrastructure/repositories/userRepository.inMemory';
import taskBuilder from '../../tooling/builders/task.builder';
import userBuilder from '../../tooling/builders/user.buider';
import getTaskUseCase from './getTask.usecase';

describe('User wants to get a task', () => {
    beforeEach(() => userRepositoryInMemory.reset());
    beforeEach(() => taskRepositoryInMemory.reset());

    test('Happy path', async () => {
        //Given a user that exists in database
        const user = userBuilder();
        userRepositoryInMemory.givenExistingUser(user);

        //Given tasks that exists in database
        const firstTask = taskBuilder({ title: 'First task', owner: user });
        const secondTask = taskBuilder({ title: 'Second task', owner: user });
        taskRepositoryInMemory.giventExistingTask(firstTask);
        taskRepositoryInMemory.giventExistingTask(secondTask);

        expect(
            await getTaskUseCase(
                firstTask.id,
                user.id,
                userRepositoryInMemory,
                taskRepositoryInMemory
            )
        ).toEqual(firstTask);
    });

    test('User does not exists in database', async () => {
        //Given a user that is not in database
        const user = userBuilder();

        //Given a task that exists in database
        const firstTask = taskBuilder({ title: 'First task', owner: user });
        taskRepositoryInMemory.giventExistingTask(firstTask);

        expect(
            async () =>
                await getTaskUseCase(
                    firstTask.id,
                    user.id,
                    userRepositoryInMemory,
                    taskRepositoryInMemory
                )
        ).rejects.toThrow('This user does not exists');
    });

    test('User is not the task owner', async () => {
        //Given a user that exists in database
        const user = userBuilder();
        userRepositoryInMemory.givenExistingUser(user);

        //Given a second user that exists in database
        const secondUser = userBuilder({ email: 'second@user.com' });
        userRepositoryInMemory.givenExistingUser(secondUser);

        //Given task that exists in database
        const firstTask = taskBuilder({ title: 'First task', owner: user });
        taskRepositoryInMemory.giventExistingTask(firstTask);

        expect(
            async () =>
                await getTaskUseCase(
                    firstTask.id,
                    secondUser.id,
                    userRepositoryInMemory,
                    taskRepositoryInMemory
                )
        ).rejects.toThrow('You are not the task owner');
    });
});

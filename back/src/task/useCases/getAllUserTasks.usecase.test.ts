import taskBuilder from '../../tooling/builders/task.builder';
import userBuilder from '../../tooling/builders/user.buider';
import userRepositoryInMemory from '../../user/userRepository.inMemory';
import taskRepositoryInMemory from '../taskRepository.inMemory';
import getAllUserTasksUseCase from './getAllUserTasks.usecase';

describe('User wants to have see all his tasks', () => {
    beforeEach(() => userRepositoryInMemory.reset());
    beforeEach(() => taskRepositoryInMemory.reset());

    test('Happy path', async () => {
        //Given a user that exists in database and has tasks
        const firstUser = userBuilder({ email: 'first@user.com' });
        userRepositoryInMemory.givenExistingUser(firstUser);

        const firstTask = taskBuilder({ owner: firstUser });
        const secondTask = taskBuilder({
            title: 'Second task',
            owner: firstUser
        });
        taskRepositoryInMemory.giventExistingTask(firstTask);
        taskRepositoryInMemory.giventExistingTask(secondTask);

        //Given a second user that exists in dabatase and has task
        const secondUser = userBuilder({ email: 'second@user.com' });

        const thirdTask = taskBuilder({ owner: secondUser });

        taskRepositoryInMemory.giventExistingTask(thirdTask);

        expect(
            await getAllUserTasksUseCase(
                firstUser.id,
                userRepositoryInMemory,
                taskRepositoryInMemory
            )
        ).toEqual([firstTask, secondTask]);
    });

    test('User does not exists in database', async () => {
        //Given a user that is not in database and has tasks
        const firstUser = userBuilder({ email: 'first@user.com' });

        const firstTask = taskBuilder({ owner: firstUser });
        const secondTask = taskBuilder({
            title: 'Second task',
            owner: firstUser
        });
        taskRepositoryInMemory.giventExistingTask(firstTask);
        taskRepositoryInMemory.giventExistingTask(secondTask);

        expect(
            async () =>
                await getAllUserTasksUseCase(
                    firstUser.id,
                    userRepositoryInMemory,
                    taskRepositoryInMemory
                )
        ).rejects.toThrow('This user does not exists in database');
    });
});

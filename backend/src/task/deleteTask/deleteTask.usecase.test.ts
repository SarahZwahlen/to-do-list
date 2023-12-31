import taskBuilder from '../../tooling/builders/task.builder';
import userBuilder from '../../tooling/builders/user.buider';
import userRepositoryInMemory from '../../infrastructure/repositories/userRepository.inMemory';
import taskRepositoryInMemory from '../../infrastructure/repositories/taskRepository.inMemory';
import deleteTaskUseCase from './deleteTask.usecase';
import taskListBuilder from '../../tooling/builders/taskList.builder';
import taskListRepositoryInMemory from '../../infrastructure/repositories/taskListRepository.inMemory';

describe('User wants to delete a task', () => {
    beforeEach(() => userRepositoryInMemory.reset());
    beforeEach(() => taskRepositoryInMemory.reset());
    beforeEach(() => taskListRepositoryInMemory.reset());

    test('Happy path', async () => {
        // Given a user that exists in database
        const user = userBuilder();
        userRepositoryInMemory.givenExistingUser(user);
        //Given a task that exists in database
        const firstTask = taskBuilder({ title: 'First Task', owner: user });
        taskRepositoryInMemory.givenExistingTask(firstTask);
        // Given a second task that exists in database
        const secondTask = taskBuilder({ title: 'Second Task', owner: user });
        taskRepositoryInMemory.givenExistingTask(secondTask);

        //Given a task List that exists in database
        const taskList = taskListBuilder({ tasks: [firstTask, secondTask] });
        taskListRepositoryInMemory.givenExistingTaskList(taskList);

        await deleteTaskUseCase(
            secondTask.id,
            user.id,
            taskRepositoryInMemory,
            userRepositoryInMemory
        );

        expect(taskList).not.toContain(secondTask);
        expect(taskRepositoryInMemory.tasks).not.toContain(secondTask);
    });

    test('User does not exists in database', async () => {
        // Given a user that does not exists in database
        const user = userBuilder();
        //Given a task that exists in database
        const firstTask = taskBuilder({ title: 'First Task', owner: user });
        taskRepositoryInMemory.givenExistingTask(firstTask);

        expect(
            async () =>
                await deleteTaskUseCase(
                    firstTask.id,
                    user.id,
                    taskRepositoryInMemory,
                    userRepositoryInMemory
                )
        ).rejects.toThrow('This user does not exists in database');
    });

    test('Task does not exists in database', async () => {
        // Given a user that exists in database
        const user = userBuilder();
        userRepositoryInMemory.givenExistingUser(user);
        //Given a task that does not exists in database
        const firstTask = taskBuilder({ title: 'First Task', owner: user });

        expect(
            async () =>
                await deleteTaskUseCase(
                    firstTask.id,
                    user.id,
                    taskRepositoryInMemory,
                    userRepositoryInMemory
                )
        ).rejects.toThrow('This task does not exists in database');
    });

    test('User is not the task owner', async () => {
        //Given a user that exists in database
        const firstUser = userBuilder({ firstname: 'first' });
        userRepositoryInMemory.givenExistingUser(firstUser);

        //Given a second user that exists in database
        const secondUser = userBuilder({
            firstname: 'second',
            email: 'second@mail.com'
        });
        userRepositoryInMemory.givenExistingUser(secondUser);

        //Given a task in database, that own to firstUser and exists in databse
        const task = taskBuilder({ owner: firstUser });
        taskRepositoryInMemory.givenExistingTask(task);

        expect(
            async () =>
                await deleteTaskUseCase(
                    task.id,
                    secondUser.id,
                    taskRepositoryInMemory,
                    userRepositoryInMemory
                )
        ).rejects.toThrow('You are not the task owner');
    });
});

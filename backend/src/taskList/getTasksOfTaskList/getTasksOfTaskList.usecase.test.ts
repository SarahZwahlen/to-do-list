import userRepositoryInMemory from '../../infrastructure/repositories/userRepository.inMemory';
import taskRepositoryInMemory from '../../infrastructure/repositories/taskRepository.inMemory';
import taskListRepositoryInMemory from '../../infrastructure/repositories/taskListRepository.inMemory';
import userBuilder from '../../tooling/builders/user.buider';
import taskBuilder from '../../tooling/builders/task.builder';
import taskListBuilder from '../../tooling/builders/taskList.builder';
import getTasksOfTaskListUseCase from './getTasksOfTaskList.usecase';

describe('User wants to see all the tasks of a task list', () => {
    beforeEach(() => userRepositoryInMemory.reset());
    beforeEach(() => taskRepositoryInMemory.reset());
    beforeAll(() => taskListRepositoryInMemory.reset());

    test('Happy path', async () => {
        //Given a user that exists in databse
        const user = userBuilder();
        userRepositoryInMemory.givenExistingUser(user);

        //Given tasks that exists in database
        const firstTask = taskBuilder({ owner: user });
        const secondTask = taskBuilder({ owner: user });
        taskRepositoryInMemory.givenExistingTask(firstTask);
        taskRepositoryInMemory.givenExistingTask(secondTask);

        //Given a taskList that exists in database
        const taskList = taskListBuilder({
            owner: user,
            tasks: [firstTask, secondTask]
        });
        taskListRepositoryInMemory.givenExistingTaskList(taskList);

        expect(
            await getTasksOfTaskListUseCase(
                user.id,
                taskList.id,
                userRepositoryInMemory,
                taskListRepositoryInMemory
            )
        ).toEqual(taskList);
    });

    test('User does not exists in database', async () => {
        //Given a user
        const user = userBuilder();

        //Given tasks that exists in database
        const firstTask = taskBuilder({ owner: user });
        const secondTask = taskBuilder({ owner: user });
        taskRepositoryInMemory.givenExistingTask(firstTask);
        taskRepositoryInMemory.givenExistingTask(secondTask);

        //Given a taskList that exists in database
        const taskList = taskListBuilder({
            owner: user,
            tasks: [firstTask, secondTask]
        });
        taskListRepositoryInMemory.givenExistingTaskList(taskList);

        expect(
            async () =>
                await getTasksOfTaskListUseCase(
                    user.id,
                    taskList.id,
                    userRepositoryInMemory,
                    taskListRepositoryInMemory
                )
        ).rejects.toThrow('This user does not exists in database');
    });

    test('Task list does not exists in database', async () => {
        //Given a user that exists in databse
        const user = userBuilder();
        userRepositoryInMemory.givenExistingUser(user);

        //Given tasks that exists in database
        const firstTask = taskBuilder({ owner: user });
        const secondTask = taskBuilder({ owner: user });
        taskRepositoryInMemory.givenExistingTask(firstTask);
        taskRepositoryInMemory.givenExistingTask(secondTask);

        //Given a taskList
        const taskList = taskListBuilder({
            owner: user,
            tasks: [firstTask, secondTask]
        });

        expect(
            async () =>
                await getTasksOfTaskListUseCase(
                    user.id,
                    taskList.id,
                    userRepositoryInMemory,
                    taskListRepositoryInMemory
                )
        ).rejects.toThrow('This task list does not exists in database');
    });

    test('User is not the task list owner', async () => {
        //Given a user that exists in databse
        const user = userBuilder();
        userRepositoryInMemory.givenExistingUser(user);

        //Given an other user that exists in database
        const otherUser = userBuilder({ email: 'other@user.com' });
        userRepositoryInMemory.givenExistingUser(otherUser);

        //Given tasks that exists in database
        const firstTask = taskBuilder({ owner: user });
        const secondTask = taskBuilder({ owner: user });
        taskRepositoryInMemory.givenExistingTask(firstTask);
        taskRepositoryInMemory.givenExistingTask(secondTask);

        //Given a taskList that exists in database
        const taskList = taskListBuilder({
            owner: user,
            tasks: [firstTask, secondTask]
        });
        taskListRepositoryInMemory.givenExistingTaskList(taskList);

        expect(
            async () =>
                await getTasksOfTaskListUseCase(
                    otherUser.id,
                    taskList.id,
                    userRepositoryInMemory,
                    taskListRepositoryInMemory
                )
        ).rejects.toThrow('You are not the task list owner');
    });
});

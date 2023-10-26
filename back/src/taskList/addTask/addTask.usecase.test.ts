import taskListRepositoryInMemory from '../../infrastructure/repositories/taskListRepository.inMemory';
import taskRepositoryInMemory from '../../infrastructure/repositories/taskRepository.inMemory';
import userRepositoryInMemory from '../../infrastructure/repositories/userRepository.inMemory';
import taskBuilder from '../../tooling/builders/task.builder';
import taskListBuilder from '../../tooling/builders/taskList.builder';
import userBuilder from '../../tooling/builders/user.buider';
import addTaskUseCase from './addTask.usecase';

describe('User wants to add a task in a task list', () => {
    beforeEach(() => userRepositoryInMemory.reset());
    beforeEach(() => taskListRepositoryInMemory.reset());
    beforeEach(() => taskRepositoryInMemory.reset());

    test('Happy path', async () => {
        //Given a user that exists in database
        const user = userBuilder();
        userRepositoryInMemory.givenExistingUser(user);

        //Given a taskList linked to the user, that exists in database
        const taskList = taskListBuilder({ owner: user });
        taskListRepositoryInMemory.givenExistingTaskList(taskList);

        //Given taskData
        const taskData = {
            title: 'test',
            description: 'test de descriptio'
        };

        const result = await addTaskUseCase(
            taskList.id,
            taskData,
            user.id,
            taskRepositoryInMemory,
            taskListRepositoryInMemory,
            userRepositoryInMemory
        );

        const expectedTask = taskBuilder({
            ...taskData,
            id: result.task?.id,
            owner: user
        });

        expect(result.task).toEqual(expectedTask);
        expect(result.taskList).toEqual(taskList);
    });

    test('User does not exists in database', async () => {
        //Given a user
        const user = userBuilder();

        //Given a taskList linked to the user, that exists in database
        const taskList = taskListBuilder({ owner: user });
        taskListRepositoryInMemory.givenExistingTaskList(taskList);

        //Given taskData
        const taskData = {
            title: 'test',
            description: 'test de descriptio'
        };

        expect(
            async () =>
                await addTaskUseCase(
                    taskList.id,
                    taskData,
                    user.id,
                    taskRepositoryInMemory,
                    taskListRepositoryInMemory,
                    userRepositoryInMemory
                )
        ).rejects.toThrow('This user does not exists in database');
    });

    test('Task list does not exists in database', async () => {
        //Given a user that exists in database
        const user = userBuilder();
        userRepositoryInMemory.givenExistingUser(user);

        //Given a taskList linked to the user
        const taskList = taskListBuilder({ owner: user });

        //Given taskData
        const taskData = {
            title: 'test',
            description: 'test de descriptio'
        };

        expect(
            async () =>
                await addTaskUseCase(
                    taskList.id,
                    taskData,
                    user.id,
                    taskRepositoryInMemory,
                    taskListRepositoryInMemory,
                    userRepositoryInMemory
                )
        ).rejects.toThrow('This task list does not exists in database');
    });
});

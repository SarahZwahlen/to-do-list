import taskListRepositoryInMemory from '../../infrastructure/repositories/taskListRepository.inMemory';
import taskRepositoryInMemory from '../../infrastructure/repositories/taskRepository.inMemory';
import userRepositoryInMemory from '../../infrastructure/repositories/userRepository.inMemory';
import taskBuilder from '../../tooling/builders/task.builder';
import taskListBuilder from '../../tooling/builders/taskList.builder';
import userBuilder from '../../tooling/builders/user.buider';
import deleteTaskListUseCase from './deleteTaskList.usecase';

describe('User wants to delete a taskList', () => {
    beforeEach(() => userRepositoryInMemory.reset());
    beforeEach(() => taskListRepositoryInMemory.reset());
    beforeEach(() => taskRepositoryInMemory.reset());

    test('Happy path', async () => {
        //Given a user that exists in database
        const user = userBuilder();
        userRepositoryInMemory.givenExistingUser(user);

        //Given tasks of the user that exist in database
        const taskOne = taskBuilder({ owner: user });
        const taskTwo = taskBuilder({ owner: user });

        taskRepositoryInMemory.givenExistingTask(taskOne);
        taskRepositoryInMemory.givenExistingTask(taskTwo);

        //Given a task list, linked to the user and to the tasks
        const taskList = taskListBuilder({
            owner: user,
            tasks: [taskOne, taskTwo]
        });
        taskListRepositoryInMemory.givenExistingTaskList(taskList);

        await deleteTaskListUseCase(
            user.id,
            taskList.id,
            userRepositoryInMemory,
            taskListRepositoryInMemory
        );

        expect(taskListRepositoryInMemory.taskLists).not.toContain(taskList);
        expect(taskRepositoryInMemory.tasks).not.toContain(taskOne);
        expect(taskRepositoryInMemory.tasks).not.toContain(taskTwo);
    });

    test('User does not exists in database', async () => {
        //Given a user
        const user = userBuilder();

        //Given tasks of the user that exist in database
        const taskOne = taskBuilder({ owner: user });
        const taskTwo = taskBuilder({ owner: user });

        taskRepositoryInMemory.givenExistingTask(taskOne);
        taskRepositoryInMemory.givenExistingTask(taskTwo);

        //Given a task list, linked to the user and to the tasks
        const taskList = taskListBuilder({
            owner: user,
            tasks: [taskOne, taskTwo]
        });
        taskListRepositoryInMemory.givenExistingTaskList(taskList);

        expect(
            async () =>
                await deleteTaskListUseCase(
                    user.id,
                    taskList.id,
                    userRepositoryInMemory,
                    taskListRepositoryInMemory
                )
        ).rejects.toThrow('This user does not exists in database');
    });

    test('TaskList does not exists in database', async () => {
        //Given a user that exists in database
        const user = userBuilder();
        userRepositoryInMemory.givenExistingUser(user);

        //Given tasks of the user that exist in database
        const taskOne = taskBuilder({ owner: user });
        const taskTwo = taskBuilder({ owner: user });

        taskRepositoryInMemory.givenExistingTask(taskOne);
        taskRepositoryInMemory.givenExistingTask(taskTwo);

        //Given a task list, linked to the user and to the tasks
        const taskList = taskListBuilder({
            owner: user,
            tasks: [taskOne, taskTwo]
        });

        expect(
            async () =>
                await deleteTaskListUseCase(
                    user.id,
                    taskList.id,
                    userRepositoryInMemory,
                    taskListRepositoryInMemory
                )
        ).rejects.toThrow('This task list does not exists in database');
    });
});

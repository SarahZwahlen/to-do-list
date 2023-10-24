import { Task } from '../../infrastructure/models/task.model';
import taskRepositoryInMemory from '../../infrastructure/repositories/taskRepository.inMemory';
import userRepositoryInMemory from '../../infrastructure/repositories/userRepository.inMemory';
import taskBuilder from '../../tooling/builders/task.builder';
import userBuilder from '../../tooling/builders/user.buider';
import updateTaskUseCase from './updateTask.usecase';

describe('User wants to update a task', () => {
    beforeEach(() => userRepositoryInMemory.reset());
    beforeEach(() => taskRepositoryInMemory.reset());

    test('Happy path', async () => {
        //Given a user that exists in dabatase
        const user = userBuilder();
        userRepositoryInMemory.givenExistingUser(user);

        //Given a task linked to the user, that exists in database
        const task = taskBuilder({ owner: user });
        taskRepositoryInMemory.giventExistingTask(task);

        //Given new task data for updapte
        const newTaskData: Partial<
            Pick<Task, 'description' | 'title' | 'state'>
        > &
            Pick<Task, 'id'> = {
            id: task.id,
            description: 'Updated description',
            state: 'in progress',
            title: 'New title'
        };

        const expectedTask = {
            ...task,
            ...newTaskData
        };

        expect(
            await updateTaskUseCase(
                user.id,
                newTaskData,
                userRepositoryInMemory,
                taskRepositoryInMemory
            )
        ).toEqual(expectedTask);
    });

    test('User does not exists in dabatase', async () => {
        //Given a user
        const user = userBuilder();

        //Given a task linked to the user, that exists in database
        const task = taskBuilder({ owner: user });
        taskRepositoryInMemory.giventExistingTask(task);

        //Given new task data for updapte
        const newTaskData: Partial<
            Pick<Task, 'description' | 'title' | 'state'>
        > &
            Pick<Task, 'id'> = {
            id: task.id,
            description: 'Updated description',
            state: 'in progress',
            title: 'New title'
        };

        const expectedTask = {
            ...task,
            ...newTaskData
        };
        expect(
            async () =>
                await updateTaskUseCase(
                    user.id,
                    newTaskData,
                    userRepositoryInMemory,
                    taskRepositoryInMemory
                )
        ).rejects.toThrow('This user does not exists in database');
    });

    test('Task does not exists in databasae', async () => {
        //Given a user that exists in dabatase
        const user = userBuilder();
        userRepositoryInMemory.givenExistingUser(user);

        //Given a task linked to the user
        const task = taskBuilder({ owner: user });

        //Given new task data for updapte
        const newTaskData: Partial<
            Pick<Task, 'description' | 'title' | 'state'>
        > &
            Pick<Task, 'id'> = {
            id: task.id,
            description: 'Updated description',
            state: 'in progress',
            title: 'New title'
        };

        const expectedTask = {
            ...task,
            ...newTaskData
        };
        expect(
            async () =>
                await updateTaskUseCase(
                    user.id,
                    newTaskData,
                    userRepositoryInMemory,
                    taskRepositoryInMemory
                )
        ).rejects.toThrow('This task does not exists in database');
    });

    test('User is not the task owner', async () => {
        //Given a user that exists in dabatase
        const user = userBuilder();
        userRepositoryInMemory.givenExistingUser(user);

        //Givent an other user that exists in database
        const secondUser = userBuilder({ email: 'second@mail.com' });
        userRepositoryInMemory.givenExistingUser(secondUser);

        //Given a task linked to the user, that exists in database
        const task = taskBuilder({ owner: user });
        taskRepositoryInMemory.giventExistingTask(task);

        //Given new task data for updapte
        const newTaskData: Partial<
            Pick<Task, 'description' | 'title' | 'state'>
        > &
            Pick<Task, 'id'> = {
            id: task.id,
            description: 'Updated description',
            state: 'in progress',
            title: 'New title'
        };

        const expectedTask = {
            ...task,
            ...newTaskData
        };
        expect(
            async () =>
                await updateTaskUseCase(
                    secondUser.id,
                    newTaskData,
                    userRepositoryInMemory,
                    taskRepositoryInMemory
                )
        ).rejects.toThrow('You are not the task owner');
    });
});

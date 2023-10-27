import taskListRepositoryInMemory from '../../infrastructure/repositories/taskListRepository.inMemory';
import taskRepositoryInMemory from '../../infrastructure/repositories/taskRepository.inMemory';
import userRepositoryInMemory from '../../infrastructure/repositories/userRepository.inMemory';
import taskListBuilder from '../../tooling/builders/taskList.builder';
import userBuilder from '../../tooling/builders/user.buider';
import getAllUserTaskListsUseCase from './getAllUserTaskLists.usecase';

describe('User wants to see all the current task lists', () => {
    beforeEach(() => userRepositoryInMemory.reset());
    beforeEach(() => taskRepositoryInMemory.reset());
    beforeEach(() => taskListRepositoryInMemory.reset());

    test('Happy path', async () => {
        //Given a user that exists in databse
        const user = userBuilder();
        userRepositoryInMemory.givenExistingUser(user);

        // Given task lists that exist in database
        const firstTaskList = taskListBuilder({ owner: user });
        const secondTaskList = taskListBuilder({ owner: user });
        taskListRepositoryInMemory.givenExistingTaskList(firstTaskList);
        taskListRepositoryInMemory.givenExistingTaskList(secondTaskList);

        expect(
            await getAllUserTaskListsUseCase(
                user.id,
                userRepositoryInMemory,
                taskListRepositoryInMemory
            )
        ).toEqual([firstTaskList, secondTaskList]);
    });

    test('User does not exists in database', async () => {
        //Given a user
        const user = userBuilder();

        // Given task lists that exist in database
        const firstTaskList = taskListBuilder({ owner: user });
        const secondTaskList = taskListBuilder({ owner: user });
        taskListRepositoryInMemory.givenExistingTaskList(firstTaskList);
        taskListRepositoryInMemory.givenExistingTaskList(secondTaskList);

        expect(
            async () =>
                await getAllUserTaskListsUseCase(
                    user.id,
                    userRepositoryInMemory,
                    taskListRepositoryInMemory
                )
        ).rejects.toThrow('This user does not exists in database');
    });
});

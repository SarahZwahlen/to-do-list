import taskListRepositoryInMemory from '../../infrastructure/repositories/taskListRepository.inMemory';
import userRepositoryInMemory from '../../infrastructure/repositories/userRepository.inMemory';
import taskListBuilder from '../../tooling/builders/taskList.builder';
import userBuilder from '../../tooling/builders/user.buider';
import createTaskListUseCase from './createTaskList.usecase';

describe('User wants to create a new task list', () => {
    beforeEach(() => userRepositoryInMemory.reset());
    beforeEach(() => taskListRepositoryInMemory.reset());

    test('Happy path', async () => {
        //Giver a user that exists in database
        const user = userBuilder();
        userRepositoryInMemory.givenExistingUser(user);

        //Given new taskList data
        const newTaskListData = taskListBuilder({ owner: user });

        const newTaskList = await createTaskListUseCase(
            user.id,
            {
                title: newTaskListData.title,
                description: newTaskListData.description
            },
            userRepositoryInMemory,
            taskListRepositoryInMemory
        );

        newTaskList!.id = newTaskListData.id;
        const list = taskListRepositoryInMemory.taskLists;

        expect(newTaskListData).toEqual(newTaskList);
        expect(list).toContain(newTaskList);
    });

    test('User does not exists in database', async () => {
        //Given a user
        const user = userBuilder();

        //Given new taskList data
        const newTaskListData = taskListBuilder({ owner: user });

        expect(
            async () =>
                await createTaskListUseCase(
                    user.id,
                    {
                        title: newTaskListData.title,
                        description: newTaskListData.description
                    },
                    userRepositoryInMemory,
                    taskListRepositoryInMemory
                )
        ).rejects.toThrow('This user does not exists in database');
    });
});

import taskRepositoryInMemory from '../../infrastructure/repositories/taskRepository.inMemory';
import userRepositoryInMemory from '../../infrastructure/repositories/userRepository.inMemory';
import userBuilder from '../../tooling/builders/user.buider';
import updateUserUseCase from './updateUser.usecase';

describe('User wants to update its data', () => {
    beforeEach(() => userRepositoryInMemory.reset());
    beforeEach(() => taskRepositoryInMemory.reset());

    test('Happy path', async () => {
        //Given a user that exists in database
        const user = userBuilder();
        userRepositoryInMemory.givenExistingUser(user);

        //Given new user data
        const newUserData = {
            id: user.id,
            email: 'new@mail.com',
            firstname: 'new',
            surname: 'new',
            password: '456'
        };

        expect(
            await updateUserUseCase(newUserData, userRepositoryInMemory)
        ).toEqual(newUserData);
    });

    test('User does not exists in database', async () => {
        //Given a user
        const user = userBuilder();

        //Given new user data
        const newUserData = {
            id: user.id,
            email: 'new@mail.com',
            firstname: 'new',
            surname: 'new',
            password: '456'
        };

        expect(
            async () =>
                await updateUserUseCase(newUserData, userRepositoryInMemory)
        ).rejects.toThrow('This user does not exists in database');
    });

    test('User to modify is not the logged user', async () => {
        //Given a user that exists in database
        const user = userBuilder();
        userRepositoryInMemory.givenExistingUser(user);

        //Given a logged user that exists in database
        const otherUser = userBuilder({ email: 'other@user.fr' });
        //Given new user data
        const newUserData = {
            id: user.id,
            email: 'new@mail.com',
            firstname: 'new',
            surname: 'new',
            password: '456'
        };

        expect(
            async () =>
                await updateUserUseCase(newUserData, userRepositoryInMemory)
        ).rejects.toThrow('This user does not exists in database');
    });
});

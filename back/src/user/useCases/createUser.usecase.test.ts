import userRepositoryInMemory from '../userRepository.inMemory';
import userBuilder from '../../tooling/builders/user.buider';
import createUserUseCase from './createUser.usecase';

describe('Save new user', () => {
    beforeEach(() => userRepositoryInMemory.reset());
    test('Happy path', async () => {
        const newUserData = userBuilder({});

        const newUser = await createUserUseCase(
            newUserData,
            userRepositoryInMemory
        );
        const users = userRepositoryInMemory.users;
        expect(newUser).toEqual(newUserData);
        expect(users).toContain(newUser);
    });

    test('User email does not have a valid format', async () => {
        // given user data
        const newUser = userBuilder({ email: '123' });

        await expect(
            async () => await createUserUseCase(newUser, userRepositoryInMemory)
        ).rejects.toThrow('Email format is invalid');
    });

    test('User email is already used', async () => {
        //Given an existing user that exists in database
        const existingUserData = userBuilder({ email: 'test@mail.com' });
        userRepositoryInMemory.givenExistingUser(existingUserData);

        //Given new user data
        const newUserData = userBuilder({
            firstname: 'Jane',
            email: 'test@mail.com'
        });

        await expect(
            async () =>
                await createUserUseCase(newUserData, userRepositoryInMemory)
        ).rejects.toThrow('Email is already used by an other user');
    });
});

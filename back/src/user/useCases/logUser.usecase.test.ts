import buildUser from '../../tooling/builders/user.buider';
import userRepositoryInMemory from '../userRepository.inMemory';
import logUserUseCase from './logUser.usecase';

describe('Log user', () => {
    beforeEach(() => userRepositoryInMemory.reset());
    test('Happy path', async () => {
        //given a user that exists in database
        const userData = buildUser({});
        userRepositoryInMemory.givenExistingUser(userData);

        //given received data
        const receivedData = {
            email: userData.email,
            password: userData.password
        };
        expect(await logUserUseCase(receivedData, userRepositoryInMemory)).toBe(
            userData
        );
    });

    test('User does not exists in database', async () => {
        const receivedData = {
            email: 'test@mail.com',
            password: '123'
        };

        await expect(
            async () =>
                await logUserUseCase(receivedData, userRepositoryInMemory)
        ).rejects.toThrow('User does not exists in database');
    });

    test('Password mismatch', async () => {
        //Given a user that exists in database
        const userData = buildUser({});
        userRepositoryInMemory.givenExistingUser(userData);

        //Given received data
        const receivedData = {
            email: userData.email,
            password: '456'
        };

        await expect(
            async () =>
                await logUserUseCase(receivedData, userRepositoryInMemory)
        ).rejects.toThrow('Password mismatch');
    });
});

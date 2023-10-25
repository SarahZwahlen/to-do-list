import { Request, Response } from 'express';
import deleteUserUseCase from './deleteUser.usecase';
import userRepositoryMongo from '../../infrastructure/repositories/userRepository.mongo';

const deleteUserController = async (req: Request, res: Response) => {
    const userSession = req.session.user;

    if (!userSession) {
        return res.status(400).json({ message: 'There is no user logged' });
    }

    try {
        await deleteUserUseCase(userSession.id, userRepositoryMongo);
        return res.status(200).json({ message: 'User has been deleted' });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: 'An error occured', error });
    }
};

export default deleteUserController;

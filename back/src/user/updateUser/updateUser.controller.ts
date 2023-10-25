import { Request, Response } from 'express';
import updateUserUseCase from './updateUser.usecase';
import userRepositoryMongo from '../../infrastructure/repositories/userRepository.mongo';

const updateUserController = async (req: Request, res: Response) => {
    const userSession = req.session.user;
    const body = req.body;

    if (!userSession) {
        return res.status(401).json({ message: 'You are not authenticated' });
    }

    try {
        const newData = { ...body, id: userSession };
        const updatedUser = await updateUserUseCase(
            newData,
            userRepositoryMongo
        );

        if (updatedUser) {
            return res.status(200).json({
                message: `${updatedUser.firstname} ${updatedUser.surname} has been updated`,
                data: {
                    firstname: updatedUser.firstname,
                    surname: updatedUser.surname,
                    email: updatedUser.email,
                    id: updatedUser.id
                }
            });
        } else {
            return res.status(400).json({
                message: 'User update failed'
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: 'An error occured', error });
    }
};

export default updateUserController;

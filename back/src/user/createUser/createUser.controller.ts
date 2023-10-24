import { Request, Response } from 'express';
import userRepositoryMongo from '../../infrastructure/repositories/userRepository.mongo';
import { User } from '../../infrastructure/models/user.model';
import createUserUseCase from './createUser.usecase';

const createUserController = async (req: Request, res: Response) => {
    const body: User = req.body;
    try {
        if (!body.email) {
            return res.status(400).json({ message: 'An email is missing' });
        }

        if (!body.firstname) {
            return res.status(400).json({ message: 'A firstname is missing' });
        }

        if (!body.surname) {
            return res.status(400).json({ message: 'A surname is missing' });
        }

        if (!body.password) {
            return res.status(400).json({ message: 'A password is missing' });
        }

        await createUserUseCase(body, userRepositoryMongo);

        return res.status(204).json({
            message: 'User is created',
            data: {
                isCreated: true
            }
        });
        
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: 'An error occured', error });
    }
};

export default createUserController;

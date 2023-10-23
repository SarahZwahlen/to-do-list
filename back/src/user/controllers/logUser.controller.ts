import { Request, Response } from 'express';
import logUserUseCase from '../useCases/logUser.usecase';
import userReponsitoryMongo from '../userRepository.mongo';

const logUserController = async (req: Request, res: Response) => {
    const body = req.body;

    try {
        const user = await logUserUseCase(body, userReponsitoryMongo);
        req.session.user = user;

        res.status(200).json({
            message: 'User logged successfully',
            data: {
                isLogged: true,
                user: {
                    firstname: user.firstname,
                    surname: user.surname,
                    email: user.email,
                    id: user.id
                }
            }
        });
    } catch (error) {
        return res.status(400).json({
            message: 'An error occured',
            error,
            data: { isLogged: false }
        });
    }
};

export default logUserController;

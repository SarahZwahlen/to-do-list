import { Request, Response } from 'express';
import logUserUseCase from './logUser.usecase';
import userRepositoryMongo from '../../infrastructure/repositories/userRepository.mongo';
import Ajv, { JSONSchemaType } from 'ajv';

const logUserController = async (req: Request, res: Response) => {
    const body = req.body;

    const ajv = new Ajv();

    interface LoginSchema {
        email: string;
        password: string;
    }

    const bodySchema: JSONSchemaType<LoginSchema> = {
        type: 'object',
        properties: {
            email: { type: 'string' },
            password: { type: 'string' }
        },
        required: ['email', 'password']
    };

    const validate = ajv.compile(bodySchema);

    if (!validate(body)) {
        return res
            .status(400)
            .json({ message: 'Body does not a valid format' });
    }

    try {
        const user = await logUserUseCase(body, userRepositoryMongo);
        req.session.user = user;

        res.status(200).json({
            message: 'User logged successfully',
            data: {
                isLogged: true,
                user: {
                    firstname: user.firstname,
                    surname: user.surname,
                    email: user.email
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

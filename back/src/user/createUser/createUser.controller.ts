import { Request, Response } from 'express';
import userRepositoryMongo from '../../infrastructure/repositories/userRepository.mongo';
import createUserUseCase from './createUser.usecase';
import Ajv, { JSONSchemaType } from 'ajv';

const createUserController = async (req: Request, res: Response) => {
    const body = req.body;

    const ajv = new Ajv();

    interface UserSchema {
        email: string;
        firstname: string;
        surname: string;
        password: string;
    }

    const bodySchema: JSONSchemaType<UserSchema> = {
        type: 'object',
        properties: {
            email: { type: 'string' },
            password: { type: 'string' },
            firstname: { type: 'string' },
            surname: { type: 'string' }
        },
        required: ['email', 'password', 'firstname', 'surname']
    };

    const validate = ajv.compile(bodySchema);

    if (!validate(body)) {
        return res
            .status(400)
            .json({ message: 'Body does not have a valid format' });
    }

    try {
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

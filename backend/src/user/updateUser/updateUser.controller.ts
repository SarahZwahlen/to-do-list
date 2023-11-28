import { Request, Response } from 'express';
import updateUserUseCase from './updateUser.usecase';
import userRepositoryMongo from '../../infrastructure/repositories/userRepository.mongo';
import Ajv, { JSONSchemaType } from 'ajv';
import { User } from '../../infrastructure/models/user.model';

const updateUserController = async (req: Request, res: Response) => {
    const userSession = req.session.user;
    const body = req.body;

    const ajv = new Ajv();

    const bodySchema: JSONSchemaType<
        Partial<Pick<User, 'email' | 'password' | 'firstname' | 'surname'>>
    > = {
        type: 'object',
        properties: {
            email: { type: 'string', nullable: true },
            password: { type: 'string', nullable: true },
            firstname: { type: 'string', nullable: true },
            surname: { type: 'string', nullable: true }
        },
        required: []
    };

    const validate = ajv.compile(bodySchema);

    if (!userSession) {
        return res.status(401).json({ message: 'You are not authenticated' });
    }

    if (!validate(body)) {
        return res.status(400).json({ message: 'Invalid body format' });
    }

    try {
        const newData = { ...body, id: userSession };
        const updatedUser = await updateUserUseCase(
            //@ts-expect-error
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

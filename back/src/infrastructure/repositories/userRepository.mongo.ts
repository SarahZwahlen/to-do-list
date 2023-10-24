import UserModel from '../models/user.model';
import { UserRepositoryInterface } from '../persistence/userRepository.interface';
import bcrypt from 'bcrypt';

const userRepositoryMongo: UserRepositoryInterface = {
    createUser: async (data) => {
        const user = new UserModel({
            ...data,
            password: await bcrypt.hash(data.password, 10)
        });

        await user.save();
        return user;
    },
    findByEmail: async (email) => {
        return await UserModel.findOne({ email });
    },
    findById: async (userId) => {
        return await UserModel.findOne({ _id: userId });
    },
    logUser: async (data) => {
        const user = await UserModel.findOne({ email: data.email });
        const isPasswordMatching = await bcrypt.compare(
            data.password,
            user!.password
        );

        return isPasswordMatching ? user : null;
    }
};

export default userRepositoryMongo;

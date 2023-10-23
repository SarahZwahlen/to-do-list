import UserModel from '../infrastructure/models/user.model';
import { UserRepositoryInterface } from './userRepository.interface';
import bcrypt from 'bcrypt';

const userReponsitoryMongo: UserRepositoryInterface = {
    createUser: async (data) => {
        const user = new UserModel({
            ...data,
            password: await bcrypt.hash(data.password, 10)
        });

        await user.save();
        return user;
    },
    findByEmail: async (email) => {
        const user = await UserModel.findOne({ email });
        return user;
    }
};

export default userReponsitoryMongo;

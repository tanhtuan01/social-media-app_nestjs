import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model } from 'mongoose';
import { UserDTO } from './user.dto';

@Injectable()
export class UserService {

    constructor(@InjectModel(User.name) private readonly userModel: Model<User>) { }

    async createUser(createUserDto: UserDTO): Promise<User> {
        try {
            return await this.userModel.create(createUserDto)
        }
        catch (error) {
            throw new HttpException(
                'INTERNAL_SERVER_ERROR',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }

    }

    async updateUser(userId: string, updateUserDto: UserDTO): Promise<User> {
        try {
            const userFind = await this.userModel.findOne({ _id: userId });
            if (!userFind) {
                throw new HttpException(
                    'USER_NOT_FOUND',
                    HttpStatus.NOT_FOUND,
                );
            } else {
                return await this.userModel.findOneAndUpdate({ _id: userId }, updateUserDto, { new: true }).exec();
            }
        } catch (error) {
            throw new HttpException(
                'INTERNAL_SERVER_ERROR',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }

    }

    async listUsers(): Promise<User[]> {
        return await this.userModel.find().lean().exec();
    }

}
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model } from 'mongoose';
import { UserDTO } from './user.dto';

@Injectable()
export class UserService {

    constructor(@InjectModel(User.name) private readonly userModel: Model<User>) { }

    async createUser(createUserDto: UserDTO): Promise<User> {
        return await this.userModel.create(createUserDto);
    }

    async updateUser(userId: string, updateUserDto: UserDTO): Promise<User> {
        return await this.userModel.findOneAndUpdate({ _id: userId }, updateUserDto, { new: true }).exec();
    }

    async listUsers(): Promise<User[]> {
        return await this.userModel.find().lean().exec();
    }

}
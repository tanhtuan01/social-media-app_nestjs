import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Chat } from './chat.schema';

@Injectable()
export class ChatService {

    constructor(@InjectModel(Chat.name) private readonly chatModel: Model<Chat>) { }

    async send(userId: string, friendId: string): Promise<Chat> {
        const chat = new this.chatModel({ userId, friendId });
        return await chat.save();
    }

    async getChatWithFriend(userId: string, friendId: string): Promise<Chat[]> {
        return await this.chatModel.find({ userId: userId, friendId: friendId }).lean().exec();
    }

}

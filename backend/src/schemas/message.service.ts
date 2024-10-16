import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message, MessageDocument } from './message.schema';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
  ) {}

  async create(sender: string, message: string): Promise<Message> {
    const newMessage = new this.messageModel({ sender, message });  // Include sender here
    return newMessage.save();  // Save to MongoDB
  }

  async findAll(): Promise<Message[]> {
    return this.messageModel.find().exec();
  }

  async findOne(id: string): Promise<Message> {
    const message = await this.messageModel.findById(id).exec();
    if (!message) {
      throw new NotFoundException(`Message with ID ${id} not found`);
    }
    return message;
  }

  async update(id: string, message: string, isRead: boolean): Promise<Message> {
    const updatedMessage = await this.messageModel
      .findByIdAndUpdate(id, { message, isRead }, { new: true })
      .exec();
    if (!updatedMessage) {
      throw new NotFoundException(`Message with ID ${id} not found`);
    }
    return updatedMessage;
  }
}
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Chat } from './chat.entity';
import { CreateChatInput } from './chat.input';
import { v1 as uuid } from 'uuid';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat)
    private chatRepository: Repository<Chat>,
  ) {}

  getChat(): Promise<Chat[]> {
    return this.chatRepository.find();
  }

  getChatItemById(id: string): Promise<Chat> {
    return this.chatRepository.findOne({ id });
  }

  createChatItem(createChatInput: CreateChatInput): Promise<Chat> {
    const { title, category, username, userId, message, img } = createChatInput;
    const chatItem = this.chatRepository.create({
      id: uuid(),
      title,
      category,
      username,
      userId,
      message,
      img,
      createdAt: new Date(Date.now()),
    });
    console.log(chatItem);
    return this.chatRepository.save(chatItem);
  }

  async editChatItem(
    id: string,
    title: string,
    category: string,
    message: string,
    img: string,
  ): Promise<Chat> {
    await this.chatRepository.update(
      { id },
      {
        title,
        category,
        message,
        img,
      },
    );

    return this.chatRepository.findOne({ id });
  }

  deleteChatItemById(id: string): Promise<DeleteResult> {
    return this.chatRepository.delete({ id });
  }
}

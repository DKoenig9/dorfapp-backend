import { UseInterceptors } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Chat } from './chat.entity';
import { CreateChatInput } from './chat.input';
import { ChatService } from './chat.service';
import { ChatType } from './chat.type';

@Resolver((of) => ChatType)
export class ChatResolver {
  constructor(private chatService: ChatService) {}

  @Query((returns) => [ChatType])
  async chat() {
    let chat = await this.chatService.getChat();
    chat.reverse();
    return chat;
  }

  @Mutation((returns) => ChatType)
  createChatItem(@Args('createChatInput') createChatInput: CreateChatInput) {
    return this.chatService.createChatItem(createChatInput);
  }

  @Mutation((returns) => ChatType)
  editChatItem(
    @Args('id') id: string,
    @Args('title') title: string,
    @Args('category') category: string,
    @Args('message') message: string,
    @Args('img') img: string,
  ) {
    return this.chatService.editChatItem(id, title, category, message, img);
  }

  @Mutation((returns) => ChatType)
  async deleteChatItemById(@Args('id') id: string) {
    const chatItem = await this.chatService.getChatItemById(id);
    await this.chatService.deleteChatItemById(id);
    return chatItem;
  }
}

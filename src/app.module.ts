import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkNeed } from './work-need/work-need.entity';
import { WorkNeedModule } from './work-need/work-need.module';
import { WorkWould } from './work-would/work-would.entity';
import { WorkWouldModule } from './work-would/work-would.module';
import { UserModule } from './user/user.module';
import { User } from './user/user.entity';
import { BoardItemModule } from './board-item/board-item.module';
import { BoardItem } from './board-item/board-item.entity';
import { Chat } from './chat/chat.entity';
import { ChatModule } from './chat/chat.module';
import { EventModule } from './event/event.module';
import { Event } from './event/event.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb://localhost/dorfapp',
      synchronize: true,
      useUnifiedTopology: true,
      entities: [WorkNeed, WorkWould, User, BoardItem, Chat, Event],
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
    }),
    WorkNeedModule,
    WorkWouldModule,
    UserModule,
    BoardItemModule,
    ChatModule,
    EventModule,
  ],
})
export class AppModule {}

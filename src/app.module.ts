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

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb://localhost/dorfapp',
      synchronize: true,
      useUnifiedTopology: true,
      entities: [WorkNeed, WorkWould, User, BoardItem],
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
    }),
    WorkNeedModule,
    WorkWouldModule,
    UserModule,
    BoardItemModule,
  ],
})
export class AppModule {}

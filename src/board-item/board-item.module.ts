import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardItem } from './board-item.entity';
import { BoardItemResolver } from './board-item.resolver';
import { BoardItemService } from './board-item.service';

@Module({
  imports: [TypeOrmModule.forFeature([BoardItem])],
  providers: [BoardItemResolver, BoardItemService],
})
export class BoardItemModule {}

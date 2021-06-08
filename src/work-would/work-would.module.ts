import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkWould } from './work-would.entity';
import { WorkWouldResolver } from './work-would.resolver';
import { WorkWouldService } from './work-would.service';

@Module({
  imports: [TypeOrmModule.forFeature([WorkWould])],
  providers: [WorkWouldResolver, WorkWouldService],
})
export class WorkWouldModule {}

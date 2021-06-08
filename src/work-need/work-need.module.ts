import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkNeed } from './work-need.entity';
import { WorkNeedResolver } from './work-need.resolver';
import { WorkNeedService } from './work-need.service';

@Module({
  imports: [TypeOrmModule.forFeature([WorkNeed])],
  providers: [WorkNeedResolver, WorkNeedService],
})
export class WorkNeedModule {}

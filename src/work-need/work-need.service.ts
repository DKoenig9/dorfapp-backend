import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { WorkNeed } from './work-need.entity';
import { v1 as uuid } from 'uuid';
import { CreateWorkNeedInput } from './work-need.input';

@Injectable()
export class WorkNeedService {
  constructor(
    @InjectRepository(WorkNeed)
    private workNeedRepository: Repository<WorkNeed>,
  ) {}

  getWorkNeed(id: string): Promise<WorkNeed> {
    return this.workNeedRepository.findOne({ id });
  }

  getWorkNeeds(): Promise<WorkNeed[]> {
    return this.workNeedRepository.find();
  }

  deleteWorkNeed(id: string): Promise<DeleteResult> {
    console.log('gh');

    return this.workNeedRepository.delete({ id });
  }

  createWorkNeed(createWorkNeedInput: CreateWorkNeedInput): Promise<WorkNeed> {
    const { username, job, description, phoneNumber } = createWorkNeedInput;
    console.log("Username: " +username);
    
    const workNeed = this.workNeedRepository.create({
      id: uuid(),
      username,
      job,
      description,
      phoneNumber,
    });
    console.log("wadawd ",workNeed);

    return this.workNeedRepository.save(workNeed);
  }
}

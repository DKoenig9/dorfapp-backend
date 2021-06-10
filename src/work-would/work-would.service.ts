import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';

import { v1 as uuid } from 'uuid';
import { WorkWould } from './work-would.entity';
import { CreateWorkWouldInput } from './work-would.input';

@Injectable()
export class WorkWouldService {
  constructor(
    @InjectRepository(WorkWould)
    private workWouldRepository: Repository<WorkWould>,
  ) {}

  getWorkWould(id: string): Promise<WorkWould> {
    return this.workWouldRepository.findOne({ id });
  }

  getWorkWoulds(): Promise<WorkWould[]> {
    return this.workWouldRepository.find();
  }

  deleteWorkWould(id: string): Promise<DeleteResult> {
    return this.workWouldRepository.delete({ id });
  }

  async editWorkWould(
    id: string,
    job: string,
    description: string,
  ): Promise<void> {
    await this.workWouldRepository.update({ id }, { job, description });
  }

  async createWorkWould(
    createWorkWouldInput: CreateWorkWouldInput,
  ): Promise<WorkWould> {
    const { username, userId , job, description, phoneNumber } = createWorkWouldInput;
    const workWould = this.workWouldRepository.create({
      id: uuid(),
      username,
      userId,
      job,
      description,
      phoneNumber,
    });
    console.log('would', workWould);

    return this.workWouldRepository.save(workWould);
  }
}

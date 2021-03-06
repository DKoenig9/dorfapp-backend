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

  async findSome(condition: string): Promise<WorkNeed[]> {
    const workNeedsByUsername = await this.workNeedRepository.find({
      where: {
        username: new RegExp(`^${condition}`),
      },
    });

    const workNeedsByJob = await this.workNeedRepository.find({
      where: {
        job: new RegExp(`^${condition}`),
      },
    });

    const workNeedsByDescription = await this.workNeedRepository.find({
      where: {
        description: new RegExp(`^${condition}`),
      },
    });

    const max = Math.max(
      workNeedsByUsername.length,
      workNeedsByJob.length,
      workNeedsByDescription.length,
    );
    if (max === workNeedsByUsername.length) return workNeedsByUsername;
    if (max === workNeedsByJob.length) return workNeedsByJob;
    if (max === workNeedsByDescription.length) return workNeedsByDescription;
  }

  getWorkNeeds(): Promise<WorkNeed[]> {
    return this.workNeedRepository.find();
  }

  deleteWorkNeed(id: string): Promise<DeleteResult> {
    console.log('gh');

    return this.workNeedRepository.delete({ id });
  }

  async editWorkNeed(
    id: string,
    job: string,
    description: string,
  ): Promise<WorkNeed> {
    await this.workNeedRepository.update({ id }, { job, description });

    return this.workNeedRepository.findOne({ id });
  }

  createWorkNeed(createWorkNeedInput: CreateWorkNeedInput): Promise<WorkNeed> {
    const { username, userId, job, description, phoneNumber } =
      createWorkNeedInput;
    console.log('Username: ' + username);

    const workNeed = this.workNeedRepository.create({
      id: uuid(),
      username,
      userId,
      job,
      description,
      phoneNumber,
      createdAt: new Date(Date.now()),
    });
    console.log('wadawd ', workNeed);

    return this.workNeedRepository.save(workNeed);
  }
}

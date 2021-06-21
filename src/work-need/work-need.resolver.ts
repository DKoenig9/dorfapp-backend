import { BadRequestException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateWorkNeedInput } from './work-need.input';
import { WorkNeedService } from './work-need.service';
import { WorkNeedType } from './work-need.type';

@Resolver((of) => WorkNeedType)
export class WorkNeedResolver {
  constructor(private workNeedService: WorkNeedService) {}

  @Query((returns) => WorkNeedType)
  workNeed(@Args('id') id: string) {
    return this.workNeedService.getWorkNeed(id);
  }

  @Query((returns) => [WorkNeedType])
  async workNeedsBySomething(@Args('value') value: string) {
    const workNeeds = await this.workNeedService.findSome(value);
    console.log('ItemsWN: ', workNeeds);

    if (workNeeds.length === 0) {
      throw new BadRequestException(
        'Keine Beiträge in "Ich brauche Hilfe" gefunden',
      );
    } else return workNeeds;
  }

  @Query((returns) => [WorkNeedType])
  async workNeeds() {
    let deleted = false;
    const workNeeds = await this.workNeedService.getWorkNeeds();

    //Array wird durchsucht und alle items, die ihr destroyDate erreicht haben, werden gelöscht
    workNeeds.forEach((element) => {
      let destroyDate = new Date();
      destroyDate.setDate(element.createdAt.getDate() + 7);
      console.log('Destroy ', destroyDate.getTime());
      console.log('Now ', Date.now());
      if (destroyDate.getTime() < Date.now()) {
        console.log('gelöscht');
        this.workNeedService.deleteWorkNeed(element.id);
        deleted = true;
      }
    });
    if (deleted) {
      return await this.workNeedService.getWorkNeeds();
    }
    return workNeeds;
  }

  @Mutation((returns) => WorkNeedType)
  async deleteWorkNeedById(@Args('id') id: string) {
    const item = await this.workNeedService.getWorkNeed(id);

    this.workNeedService.deleteWorkNeed(id);
    console.log('WorkNeed erfolgreich gelöscht!');

    return item;
  }

  @Mutation((returns) => WorkNeedType)
  async editWorkNeed(
    @Args('id') id: string,
    @Args('job') job: string,
    @Args('description') description: string,
  ) {
    await this.workNeedService.editWorkNeed(id, job, description);

    return this.workNeedService.getWorkNeed(id);
  }

  @Mutation((returns) => WorkNeedType)
  createWorkNeed(
    @Args('createWorkNeedInput') createWorkNeedInput: CreateWorkNeedInput,
  ) {
    return this.workNeedService.createWorkNeed(createWorkNeedInput);
  }
}

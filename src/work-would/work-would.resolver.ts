import { BadRequestException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateWorkWouldInput } from './work-would.input';
import { WorkWouldService } from './work-would.service';
import { WorkWouldType } from './work-would.type';

@Resolver((of) => WorkWouldType)
export class WorkWouldResolver {
  constructor(private workWouldService: WorkWouldService) {}

  @Query((returns) => WorkWouldType)
  workWould(@Args('id') id: string) {
    return this.workWouldService.getWorkWould(id);
  }

  @Query((returns) => [WorkWouldType])
  async workWouldsBySomething(@Args('value') value: string) {
    const workWoulds = await this.workWouldService.findSome(value);
    console.log('ItemsWW: ', workWoulds);
    if (workWoulds.length === 0) {
      throw new BadRequestException(
        'Keine Beiträge in "Ich möchte Helfen" gefunden',
      );
    } else return workWoulds;
  }

  @Query((returns) => [WorkWouldType])
  async workWoulds() {
    let deleted = false;
    const workWoulds = await this.workWouldService.getWorkWoulds();

    //Array wird durchsucht und alle items, die ihr destroyDate erreicht haben, werden gelöscht
    workWoulds.forEach((element) => {
      let destroyDate = new Date();
      destroyDate.setDate(element.createdAt.getDate() + 7);
      console.log('Destroy ', destroyDate.getTime());
      console.log('Now ', Date.now());
      if (destroyDate.getTime() < Date.now()) {
        console.log('Would gelöscht');
        this.workWouldService.deleteWorkWould(element.id);
        deleted = true;
      }
    });
    if (deleted) {
      return await this.workWouldService.getWorkWoulds();
    }
    return workWoulds;
  }

  @Mutation((returns) => WorkWouldType)
  async deleteWorkWouldById(@Args('id') id: string) {
    const item = await this.workWouldService.getWorkWould(id);

    this.workWouldService.deleteWorkWould(id);
    console.log('WorkWould erfolgreich gelöscht!');

    return item;
  }

  @Mutation((returns) => WorkWouldType)
  async editWorkWould(
    @Args('id') id: string,
    @Args('job') job: string,
    @Args('description') description: string,
  ) {
    await this.workWouldService.editWorkWould(id, job, description);
    return this.workWouldService.getWorkWould(id);
  }

  @Mutation((returns) => WorkWouldType)
  createWorkWould(
    @Args('createWorkWouldInput') createWorkWouldInput: CreateWorkWouldInput,
  ) {
    return this.workWouldService.createWorkWould(createWorkWouldInput);
  }
}

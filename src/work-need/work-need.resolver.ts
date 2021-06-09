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
  workNeeds() {
    console.log('Alle');
    return this.workNeedService.getWorkNeeds();
  }

  @Mutation((returns) => WorkNeedType)
  async deleteWorkNeedById(@Args('id') id: string) {
    const item = await this.workNeedService.getWorkNeed(id);

    this.workNeedService.deleteWorkNeed(id);
    console.log('WorkNeed erfolgreich gelöscht!');

    return item;
  }

  @Mutation(returns => WorkNeedType)
  async editWorkNeed(
    @Args('id') id: string,
    @Args('job') job: string,
    @Args('description') description: string,
  ){
    await this.workNeedService.editWorkNeed(id, job, description);
    console.log("return");
    
    return this.workNeedService.getWorkNeed(id)
  }

  @Mutation((returns) => WorkNeedType)
  createWorkNeed(
    @Args('createWorkNeedInput') createWorkNeedInput: CreateWorkNeedInput,
  ) {
    console.log('Hier');

    return this.workNeedService.createWorkNeed(createWorkNeedInput);
  }
}

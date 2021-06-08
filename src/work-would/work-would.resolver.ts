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
  workWoulds() {
    return this.workWouldService.getWorkWoulds();
  }

  @Mutation((returns) => WorkWouldType)
  async deleteWorkWouldById(@Args('id') id: string) {
    const item = await this.workWouldService.getWorkWould(id);
    
    this.workWouldService.deleteWorkWould(id);
    console.log("WorkWould erfolgreich gelöscht!");
    
    return item;
  }

  @Mutation((returns) => WorkWouldType)
  createWorkWould(
    @Args('createWorkWouldInput') createWorkWouldInput: CreateWorkWouldInput,
  ) {
    return this.workWouldService.createWorkWould(createWorkWouldInput);
  }
}

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BoardItem } from './board-item.entity';
import { CreateBoardItemInput } from './board-item.input';
import { BoardItemService } from './board-item.service';
import { BoardItemType } from './board-item.type';

@Resolver((of) => BoardItemType)
export class BoardItemResolver {
  constructor(private boardItemService: BoardItemService){}

  @Query(returns => [BoardItemType])
  boardItems(){
    return this.boardItemService.getBoardItems();
  }


  @Mutation(returns => BoardItemType)
  async createBoardItem (@Args('createBoardItemInput') createBoardItemInput: CreateBoardItemInput){
    return this.boardItemService.createBoardItem(createBoardItemInput)
  }

  
}

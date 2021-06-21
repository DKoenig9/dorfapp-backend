import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BoardItem } from './board-item.entity';
import { CreateBoardItemInput } from './board-item.input';
import { BoardItemService } from './board-item.service';
import { BoardItemType } from './board-item.type';

@Resolver((of) => BoardItemType)
export class BoardItemResolver {
  constructor(private boardItemService: BoardItemService) {}

  @Query((returns) => [BoardItemType])
  boardItems() {
    return this.boardItemService.getBoardItems();
  }

  @Mutation((returns) => BoardItemType)
  async createBoardItem(
    @Args('createBoardItemInput') createBoardItemInput: CreateBoardItemInput,
  ) {
    return this.boardItemService.createBoardItem(createBoardItemInput);
  }

  @Mutation((returns) => BoardItemType)
  async deleteBoardItemById(@Args('id') id: string) {
    const item = await this.boardItemService.getBoardItemById(id);
    this.boardItemService.deleteBoardItemById(id);
    console.log('läuft');

    return item;
  }

  @Mutation((returns) => BoardItemType)
  updateBoardItemById(
    @Args('id') id: string,
    @Args('title') title: string,
    @Args('teaser') teaser: string,
    @Args('imgUrl') imgUrl: string,
    @Args('link') link: string,
  ) {
    return this.boardItemService.updateBoardItemById(
      id,
      title,
      teaser,
      imgUrl,
      link,
    );
  }
}

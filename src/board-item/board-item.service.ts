import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BoardItem } from './board-item.entity';
import { CreateBoardItemInput } from './board-item.input';
import { v1 as uuid } from 'uuid';

@Injectable()
export class BoardItemService {
  constructor(
    @InjectRepository(BoardItem)
    private boardItemRepository: Repository<BoardItem>,
  ) {}

  getBoardItems(): Promise<BoardItem[]>{
    return this.boardItemRepository.find();
  }

  createBoardItem(
    createBoardItemInput: CreateBoardItemInput,
  ): Promise<BoardItem> {
    const { title, teaser, link, imgUrl } = createBoardItemInput;
    const boardItem = this.boardItemRepository.create({
      id: uuid(),
      title,
      teaser,
      link,
      imgUrl,
    });

    return this.boardItemRepository.save(boardItem);
  }
}

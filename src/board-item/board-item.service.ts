import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { BoardItem } from './board-item.entity';
import { CreateBoardItemInput } from './board-item.input';
import { v1 as uuid } from 'uuid';

@Injectable()
export class BoardItemService {
  constructor(
    @InjectRepository(BoardItem)
    private boardItemRepository: Repository<BoardItem>,
  ) {}

  getBoardItems(): Promise<BoardItem[]> {
    return this.boardItemRepository.find();
  }

  getBoardItemById(id: string): Promise<BoardItem> {
    return this.boardItemRepository.findOne({ id });
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

  deleteBoardItemById(id: string): Promise<DeleteResult> {
    return this.boardItemRepository.delete({ id });
  }

  async updateBoardItemById(
    id: string,
    title: string,
    teaser: string,
    imgUrl: string,
    link: string,
  ): Promise<BoardItem> {
    await this.boardItemRepository.update(
      { id },
      { title, teaser, imgUrl, link },
    );
    return this.boardItemRepository.findOne({ id });
  }
}

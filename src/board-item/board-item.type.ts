import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('BoardItem')
export class BoardItemType {
  @Field((type) => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  teaser: string;

  @Field()
  link: string;

  @Field()
  imgUrl: string;
}

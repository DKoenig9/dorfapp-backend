import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('Chat')
export class ChatType {
  @Field((type) => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  category: string;

  @Field()
  username: string;

  @Field()
  userId: string;

  @Field()
  message: string;

  @Field()
  img: string;

  @Field()
  createdAt: Date;
}

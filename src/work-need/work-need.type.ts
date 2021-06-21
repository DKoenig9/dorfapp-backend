import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('WorkNeed')
export class WorkNeedType {
  @Field((type) => ID)
  id: string;

  @Field()
  username: string;

  @Field()
  userId: string;

  @Field()
  job: string;

  @Field()
  description: string;

  @Field()
  phoneNumber: string;

  @Field()
  createdAt: Date;
}

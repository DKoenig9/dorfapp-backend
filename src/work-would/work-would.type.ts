import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('WorkWould')
export class WorkWouldType {
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
}

import { Field, InputType } from '@nestjs/graphql';
import { MinLength } from 'class-validator';

@InputType()
export class CreateWorkNeedInput {
  @Field()
  @MinLength(1)
  username: string;

  @Field()
  @MinLength(1)
  job: string;

  @Field()
  @MinLength(1)
  description: string;

  @Field()
  @MinLength(1)
  phoneNumber: string;
}

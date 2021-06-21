import { Field, InputType } from '@nestjs/graphql';
import { minLength, MinLength } from 'class-validator';

@InputType()
export class CreateChatInput {
  @Field()
  @MinLength(1)
  title: string;

  @Field()
  @MinLength(1)
  category: string;

  @Field()
  @MinLength(1)
  username: string;

  @Field()
  @MinLength(1)
  userId: string;

  @Field()
  @MinLength(1)
  message: string;

  @Field()
  @MinLength(1)
  img: string;
}

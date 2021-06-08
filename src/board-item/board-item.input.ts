import { Field, InputType } from "@nestjs/graphql";
import { MinLength } from "class-validator";

@InputType()
export class CreateBoardItemInput{
  @Field()
  @MinLength(1)
  title: string;

  @Field()
  @MinLength(1)
  teaser:string;

  @Field()
  @MinLength(1)
  link:string;

  @Field()
  @MinLength(1)
  imgUrl:string;
}
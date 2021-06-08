import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsPhoneNumber, MinLength } from "class-validator";

@InputType()
export class CreateUserInput {
  @Field()
  @IsEmail()
  email:string

   @Field()
   @MinLength(6)
  password: string;

  @Field()
  @MinLength(1)
  username:string;

  @Field()
  //@IsPhoneNumber()
  phoneNumber:string;


 

}
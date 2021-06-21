import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('Event')
export class EventType {
  @Field((type) => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  startDate: string;

  @Field()
  endDate: string;

  @Field()
  allDay: boolean;
}

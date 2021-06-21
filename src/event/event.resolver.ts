import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { EventService } from './event.service';
import { EventType } from './event.type';

@Resolver()
export class EventResolver {
  constructor(private eventService: EventService) {}

  @Query((returns) => [EventType])
  events() {
    return this.eventService.getEvents();
  }

  @Mutation((returns) => EventType)
  createEvent(
    @Args('title') title: string,
    @Args('startDate') startDate: string,
    @Args('endDate') endDate: string,
    @Args('allDay') allDay: boolean,
  ) {
    return this.eventService.createEvent(title, startDate, endDate, allDay);
  }

  @Mutation((returns) => EventType)
  editEvent(
    @Args('id') id: string,
    @Args('title') title: string,
    @Args('startDate') startDate: string,
    @Args('endDate') endDate: string,
    @Args('allDay') allDay: boolean,
  ) {
    this.eventService.editEvent(id, title, startDate, endDate, allDay);
  }

  @Mutation((returns) => EventType)
  async deleteEventById(@Args('id') id: string) {
    const event = await this.eventService.getEventById(id);
    await this.eventService.deleteEventById(id);
    return event;
  }
}

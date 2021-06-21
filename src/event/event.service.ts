import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { v1 as uuid } from 'uuid';
import { Event } from './event.entity';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
  ) {}

  getEvents(): Promise<Event[]> {
    return this.eventRepository.find();
  }

  getEventById(id: string): Promise<Event> {
    return this.eventRepository.findOne({ id });
  }

  createEvent(
    title: string,
    startDate: string,
    endDate: string,
    allDay: boolean,
  ): Promise<Event> {
    const newEvent = this.eventRepository.create({
      id: uuid(),
      title,
      startDate,
      endDate,
      allDay,
    });

    return this.eventRepository.save(newEvent);
  }

  async editEvent(
    id: string,
    title: string,
    startDate: string,
    endDate: string,
    allDay: boolean,
  ): Promise<Event> {
    await this.eventRepository.update(
      { id },
      { title, startDate, endDate, allDay },
    );

    return this.eventRepository.findOne({ id });
  }

  deleteEventById(id: string): Promise<DeleteResult> {
    return this.eventRepository.delete({ id });
  }
}

import { Column, Entity, ObjectIdColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class WorkWould {
  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn()
  id: string;

  @Column()
  username: string;

  @Column()
  userId: string;

  @Column()
  job: string;

  @Column()
  description: string;

  @Column()
  phoneNumber: string;

  @Column()
  createdAt: Date;

  
}

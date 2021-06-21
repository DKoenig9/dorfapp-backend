import { Column, Entity, ObjectIdColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class Chat {
  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  category: string;

  @Column()
  username: string;

  @Column()
  userId: string;

  @Column()
  message: string;

  @Column()
  img: string;

  @Column()
  createdAt: Date;
}

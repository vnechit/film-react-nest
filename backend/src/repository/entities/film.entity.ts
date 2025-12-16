import { Entity, Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Schedules } from './schedule.entity';

@Entity()
export class Films {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  rating: number;

  @Column()
  director: string;

  @Column('text', { array: true })
  tags: string[];

  @Column()
  image: string;

  @Column()
  cover: string;

  @Column()
  title: string;

  @Column()
  about: string;

  @Column()
  description: string;

  @OneToMany(() => Schedules, (schedule) => schedule.film)
  schedules: Schedules[];
}

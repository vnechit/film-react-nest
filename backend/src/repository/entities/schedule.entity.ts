import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Films } from './film.entity';

@Entity()
export class Schedules {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  daytime: string;

  @Column()
  hall: number;

  @Column()
  price: number;

  @Column()
  rows: number;

  @Column()
  seats: number;

  @Column()
  taken?: string;

  @Column()
  filmId: string;

  @ManyToOne(() => Films, (films) => films.schedules)
  @JoinColumn({ name: 'filmId' })
  film: Films;
}

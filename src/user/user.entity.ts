// src/user/user.entity.ts
import { IsEmail } from 'class-validator';
import { Note } from 'src/note/entities/note.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @IsEmail()
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;
  @OneToMany(() => Note, (note) => note.user)
  notes: Note[];
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}

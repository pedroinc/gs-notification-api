import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Category } from "./Category.js";

import { IsEmail } from "class-validator";
import { Channel } from "./Channel.js";

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column({ type: "varchar" })
  name: string;

  @Column({ length: 255, type:"varchar", unique: true })
  @IsEmail()
  email: string;

  @Column({ length: 45, type:"varchar" })
  phoneNumber: string;

  @ManyToMany(() => Category, { eager: true })
  @JoinTable({ name: 'users_categories' })
  categorySubscriptions?: Category[];

  @ManyToMany(() => Channel, { eager: true })
  @JoinTable({ name: 'users_channels',  })
  notificationChannels?: Channel[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

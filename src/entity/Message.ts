import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToMany, JoinTable } from "typeorm";

import { Category } from "./Category.js";

@Entity({ name: 'messages' })
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column("text")
  content: string;

  @ManyToMany(() => Category)
  @JoinTable({ name: 'messages_categories' })
  categories: Category[]

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;  
}

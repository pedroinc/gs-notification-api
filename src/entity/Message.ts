import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";

import { Category } from "./Category.js";

@Entity({ name: "messages" })
export class Message {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column("text")
  content: string;

  @ManyToOne(() => Category, (category) => category.messages)
  @JoinColumn({ name: "categoryId" })
  category: Category;

  @Column({ type: "varchar" })
  categoryId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

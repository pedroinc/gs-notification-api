import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'categories' })
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ length: 255, type: "varchar" })
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;  
}
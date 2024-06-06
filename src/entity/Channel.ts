import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: 'channels' })
export class Channel {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column({ length: 255, type: "varchar" })
  name: string;

  @Column({ length: 45, type: "varchar" })
  tag: string;  

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

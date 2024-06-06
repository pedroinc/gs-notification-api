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

  @Column({ length: 255, type: "varchar" })
  name: string;

  @Column({ length: 255, type:"varchar" })
  @IsEmail()
  email: string;

  @Column({ length: 45, type:"varchar" })
  phoneNumber: string;

  @ManyToMany(() => Category)
  @JoinTable({ name: 'users_categories' })
  categorySubscriptions: Category[];

  @ManyToMany(() => Channel)
  @JoinTable({ name: 'users_channels' })
  notificationChannels: Channel[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

// const { Model, DataTypes } = require('sequelize');

// class User extends Model {
//   static init(sequelize) {
//     super.init(
//       {
//         id: {
//           type: DataTypes.UUID,
//           defaultValue: DataTypes.UUIDV4,
//           primaryKey: true,
//         },
//         name: {
//           type: DataTypes.STRING,
//         },
//         email: {
//           type: DataTypes.STRING,
//           allowNull: false,
//           unique: true,
//           validate: {
//             isEmail: true,
//           },
//         },
//         phoneNumber: {
//           type: DataTypes.STRING,
//         },

//         // subscriptions: [],
//         // channels: []
//       },
//       {
//         sequelize,
//       },
//     );
//   }
// }

// module.exports = User;

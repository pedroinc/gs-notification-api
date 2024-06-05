import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
// import {
//     Contains,
//     IsInt,
//     Length,
//     IsEmail,
//     IsFQDN,
//     IsDate,
//     Min,
//     Max,
// } from "class-validator"

// @Entity()
// export class Message {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column()
//   text: string;

//   @Column()
//   createDate: Date;
// }

// const { Model, DataTypes } = require('sequelize');

// class Message extends Model {
//   static init(sequelize) {
//     super.init(
//       {
//         id: {
//           type: DataTypes.UUID,
//           defaultValue: DataTypes.UUIDV4,
//           primaryKey: true,
//         },
//         content: {
//           type: DataTypes.TEXT('long'),
//           allowNull: false,
//         },
//         categoryId: DataTypes.UUID,
//       },
//       {
//         sequelize,
//       },
//     );
//   }
// }

// module.exports = Message;

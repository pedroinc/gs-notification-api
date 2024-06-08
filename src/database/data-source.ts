import { DataSource } from "typeorm";

// export const AppDataSource = new DataSource({
//     type: "postgres",
//     host: "localhost",
//     port: 5432,
//     username: "postgres",
//     password: "postgres123",
//     database: "postgres",
//     schema: "gila",
//     entities: ["src/entity/*.ts"],
//     logging: true,
//     synchronize: true,
//   });

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "db.sqlite",
  entities: ["src/entity/*.ts"],
  // logging: true,
  synchronize: true,
});

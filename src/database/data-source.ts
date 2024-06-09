import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "db.sqlite",
  entities: ["src/entity/*.ts"],
  logging: true,
  synchronize: true,
});

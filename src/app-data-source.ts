import { DataSource } from "typeorm"

export const myDataSource = new DataSource({
    type: "sqlite",
    // host: "localhost",
    // port: 3306,
    // username: "test",
    // password: "test",
    database: "db.sqlite",
    entities: ["src/entity/*.js"],
    logging: true,
    synchronize: true,
})
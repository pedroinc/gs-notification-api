import "dotenv/config";
import "reflect-metadata";

import { Request, Response } from "express";

import express from "express";

import { AppDataSource } from "./database/data-source.js";

const app = express();

// const appRouter = require('./routes');

type Config = {
  hostname: string;
  port: number;
};

const config: Config = {
  hostname: process.env.HOST || "0.0.0.0",
  port: process.env.PORT ? Number.parseInt(process.env.PORT) : 3000,
};

app.use(express.json());

// app.get("/", async (req: Request, res: Response) => {
//   try {
//     console.log(`server running on port ${config.port}`);
//     return res.json({ message: "Notification App" });
//   } catch (error) {
//     return res.json({ error });
//   }
// });

app.post("/message", async (req: Request, res: Response) => {
  console.log("message POST");

  try {
    const { categoryId, message } = req.body;

    console.log({ categoryId, message });
    // const result = await sendMessageService({ categoryId, message });
    return res.json({ categoryId, message });
  } catch (error) {
    console.error("error", error);
    return res.status(400).json({ message: "error while sending a message" });
  }
});

// app.use(appRouter);

// app.use('/customers', isTokenValid, require('./routes/customer.routes'));
// app.use('/vehicles', isTokenValid, require('./routes/vehicle.routes'));
// app.use('/repairs', isTokenValid, require('./routes/repair.routes'));

// app.use('/auth', require('./routes/auth.routes'));
// app.use('/users', require('./routes/user.routes'));

// console.log(app.routes());

app.listen(config.port, config.hostname, () => {
  console.log(`server running on port ${config.port}`);

// to initialize the initial connection with the database, register all entities
// and "synchronize" database schema, call "initialize()" method of a newly created database
// once in your application bootstrap
AppDataSource.initialize()
  .then(() => {
    // here you can start to work with your database

    // const categoryRepository = queryRunner.connection.getRepository(Category);

    // await categoryRepository.insert([
    //   { name: "Sports" },
    //   { name: "Finance" },
    //   { name: "Movies" },
    // ]);
  })
  .catch((error) => console.log(error));

});

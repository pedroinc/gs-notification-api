import "dotenv/config";
import "reflect-metadata";

import { Request, Response } from "express";

import express from "express";

import { AppDataSource } from "./database/data-source.js";
import { logger } from "./utils/logger.js";
import { Message } from "./entity/Message.js";
import { Category } from "./entity/Category.js";
import { User } from "./entity/User.js";
import { In } from "typeorm";

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

app.post("/message", async (req: Request, res: Response) => {
  console.log("message POST");

  try {
    const { categoryId, content } = req.body;

    const categoryRepository = AppDataSource.getRepository(Category);
    const category = await categoryRepository.findOneBy({ id: categoryId });

    if (!category) throw Error(`Invalid category id: ${categoryId}`);

    // const messageRepository = AppDataSource.getRepository(Message);
    // const message = await messageRepository.save({ categoryId, content });

    // logger.info('message saved');
    // logger.info(message);

    // TODO query users from category
    // TODO send notification (using interface)
    // TODO log in a file
    // TODO encapsulate domain logic inside a send notification generic service

    const userRepository = AppDataSource.getRepository(User);

    const usersFromCategory = await userRepository.find({
      relations: { categorySubscriptions: true },
      where: {
        categorySubscriptions: {
          id: categoryId,
        },
      },
    });
    // const users = await userRepository.find();
    // categoryRepository.findBy({ id: categoryId })

    console.log("usersFromCategory", usersFromCategory);

    return res.status(200).json(usersFromCategory);

    // const usersFromCategory = userRepository.find({ where: { categorySubscriptions: In([categoryId]) } });
    // console.log('usersFromCategory', usersFromCategory);

    // const result = await sendMessageService({ categoryId, message });
    // return res.json({ categoryId, content });
  } catch (error) {
    logger.error(error);
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
  logger.info(`server running on port ${config.port}`);

  // to initialize the initial connection with the database, register all entities
  // and "synchronize" database schema, call "initialize()" method of a newly created database
  // once in your application bootstrap
  AppDataSource.initialize()
    .then(() => {
      logger.info("db initialized");
    })
    .catch((error) => console.log(error));
});

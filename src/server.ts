import "dotenv/config";
import "reflect-metadata";

import express from "express";
import { AppDataSource } from "./database/data-source.js";
import { appRouter } from "./routes/index.js";
import { LoggerWrapper } from "./utils/logger.js";
const app = express();

type Config = {
  hostname: string;
  port: number;
};

const config: Config = {
  hostname: process.env.HOST || "0.0.0.0",
  port: process.env.PORT ? Number.parseInt(process.env.PORT) : 3000,
};

app.use(express.json());
app.use(appRouter);

app.listen(config.port, config.hostname, () => {
  LoggerWrapper.info(`server running on port ${config.port}`);

  AppDataSource.initialize()
    .then(() => {
      LoggerWrapper.info("db initialized");
    })
    .catch((error) => console.log(error));
});

import "dotenv/config";
import "reflect-metadata";

import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { AppDataSource } from "./database/data-source.js";
import { appRouter } from "./routes/index.js";
import { LoggerWrapper } from "./utils/logger.js";
const app = express();

type Config = {
  hostname: string;
  port: number;
  allowedOrigin: string;
};

const config: Config = {
  hostname: process.env.HOST || "0.0.0.0",
  port: process.env.PORT ? Number.parseInt(process.env.PORT) : 4000,
  allowedOrigin: process.env.FRONT_URL || "http://localhost:3000",
};

app.use(express.json());
app.use(cors());
app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Access-Control-Allow-Origin", config.allowedOrigin);
  res.setHeader("Access-Control-Allow-Methods", "POST, GET");
  next();
});

app.use(appRouter);

app.listen(config.port, config.hostname, () => {
  LoggerWrapper.info(`server running on port ${config.port}`);

  AppDataSource.initialize()
    .then(() => {
      LoggerWrapper.info("db initialized");
    })
    .catch((error) => console.log(error));
});

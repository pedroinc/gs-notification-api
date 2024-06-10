import express from "express";
import { messageRouter } from "./message.routes.js";
import { validateNotificationInput } from "../middlewares/index.js";
import { categoryRouter } from "./category.routes.js";
import { logRouter } from "./log.routes.js";

export const appRouter = express.Router();

appRouter.use("/messages", validateNotificationInput, messageRouter);
appRouter.use("/categories", categoryRouter);
appRouter.use("/logs", logRouter);

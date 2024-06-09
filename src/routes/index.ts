import express from "express";
import { messagesRouter } from "./messages.routes.js";
import { validateNotificationInput } from "../middlewares/index.js";

export const appRouter = express.Router();

appRouter.use("/messages", validateNotificationInput, messagesRouter);

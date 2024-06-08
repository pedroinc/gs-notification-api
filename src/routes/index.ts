import express from "express";
import { messagesRouter } from "./messages.routes.js";

export const appRouter = express.Router();

appRouter.use('/messages', messagesRouter);


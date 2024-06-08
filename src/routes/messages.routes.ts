import { Request, Response } from "express";

import express from "express";
import { LoggerWrapper } from "../utils/logger.js";
import { SendNotificationService } from "../services/notification/NotificationService.js";

const sendNotificationService = new SendNotificationService();

export const messagesRouter = express.Router();

messagesRouter.post("/", async (req: Request, res: Response) => {

  try {
    const { categoryId, content } = req.body;

    await sendNotificationService.execute({ categoryId, content });

    // TODO query users from category
    // TODO send notification (using interface)
    // TODO log in a file
    // TODO encapsulate domain logic inside a send notification generic service

    return res.status(200).json({ categoryId, content });

  } catch (error) {
    LoggerWrapper.error(error);
    return res.status(400).json({ message: "error while sending a message" });
  }
});

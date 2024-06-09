import { NextFunction, Request, Response } from "express";

import express from "express";
import { LoggerWrapper } from "../utils/logger.js";
import { SendNotificationService } from "../services/notification/NotificationService.js";
import { ErrorMessages, HTTP_STATUS } from "../config/index.js";

const sendNotificationService = new SendNotificationService();

export const messagesRouter = express.Router();

interface RequestBody {
  categoryId: string;
  content: string;
}

messagesRouter.post("/", async (req: Request, res: Response) => {
  try {
    const { categoryId, content }: RequestBody = req.body;

    await sendNotificationService.execute({ categoryId, content });

    return res.status(200).json({ categoryId, content });
  } catch (error) {
    LoggerWrapper.error(error);
    return res
      .status(HTTP_STATUS.INTERNAL_ERROR)
      .json({ message: ErrorMessages.INTERNAL_SERVER_ERROR });
  }
});

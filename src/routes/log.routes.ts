import { Request, Response } from "express";

import express from "express";
import { LoggerWrapper } from "../utils/logger.js";
import { ErrorMessages, HTTP_STATUS } from "../config/index.js";
import { FetchLogsService } from "../services/FetchLogsService.js";

export const logRouter = express.Router();

const fetchLogsService = new FetchLogsService();

logRouter.get("/", async (req: Request, res: Response) => {
  try {
   const logs = await fetchLogsService.execute();
    return res.status(200).json(logs);
  } catch (error) {
    LoggerWrapper.error(error);
    return res
      .status(HTTP_STATUS.INTERNAL_ERROR)
      .json({ message: ErrorMessages.INTERNAL_SERVER_ERROR });
  }
});

import { Request, Response } from "express";

import express from "express";
import { LoggerWrapper } from "../utils/logger.js";
import { ErrorMessages, HTTP_STATUS } from "../config/index.js";
import { FetchCategoriesService } from "../services/FetchCategoriesService.js";

export const categoryRouter = express.Router();

const fetchCategoriesService = new FetchCategoriesService();

categoryRouter.get("/", async (req: Request, res: Response) => {
  try {
    const categories = await fetchCategoriesService.execute();
    return res.status(200).json(categories);
  } catch (error) {
    LoggerWrapper.error(error);
    return res
      .status(HTTP_STATUS.INTERNAL_ERROR)
      .json({ message: ErrorMessages.INTERNAL_SERVER_ERROR });
  }
});

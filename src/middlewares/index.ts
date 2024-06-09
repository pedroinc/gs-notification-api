import { NextFunction, Request, Response } from "express";
import { ErrorMessages, HTTP_STATUS } from "../config/index.js";

interface RequestBody {
  categoryId: string;
  content: string;
}

export const validateNotificationInput = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { categoryId, content }: RequestBody = req.body;

  if (!categoryId) {
    return res
      .status(HTTP_STATUS.BAD_REQUEST)
      .json({ message: ErrorMessages.CATEGORY_ID_NOT_PROVIDED });
  }

  if (!content || !content.length) {
    return res
      .status(HTTP_STATUS.BAD_REQUEST)
      .json({ message: ErrorMessages.MESSAGE_CANNOT_BE_EMPTY });
  }
  return next();
};

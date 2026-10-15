import type { NextFunction, Request, Response } from "express";
import { CustomError } from "../utils/Error";

export const ErrorHandler = async (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (error instanceof CustomError) {
      return res.status(error.statusCode).json({
        message:error.message
    });
  }

  return res.status(400).json({
    message: error.message,
  });
};

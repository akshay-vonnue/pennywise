import type { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";

export type AuthenticatedRequest = Request & {
  userId: string;
};

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.headers.authorization?.replace("Bearer", "").trim();
    console.log(token);
    const user = verifyToken(token as string);

      (req as AuthenticatedRequest).userId = user.userId;
      next()
  } catch (error) {
    next(error);
  }
};

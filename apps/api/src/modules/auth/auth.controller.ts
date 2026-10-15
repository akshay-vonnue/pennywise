import type { Request, Response } from "express";
import { loginService, meService, registerService } from "./auth.service";

export const registerController = async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;
  const result = await registerService({ name, email, password, role });

  return res.status(200).json(result);
};

export const loginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const result = await loginService({ email, password });

  return res.status(200).json(result);
};

export const meController = async (req: Request, res: Response) => {
  const token = req.headers.authorization?.replace("Bearer", "").trim();
  const result = await meService(token as string);

  return res.status(200).json(result);
};

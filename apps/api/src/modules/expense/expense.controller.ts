import type { Request, Response } from "express";
import {
  createExpenseService,
  deleteExpenseService,
  FetchExpensesService,
  updateExpenseService,
} from "./expense.service";
import type { AuthenticatedRequest } from "../../middleware/authMiddleware";

export const fetchExpensesController = async (req: Request, res: Response) => {
  const { search, category, start_time, end_time } = req.query;
  const id = (req as AuthenticatedRequest).userId;

  const result = await FetchExpensesService(
    id,
    search as string,
    category as string,
    start_time as string,
    end_time as string,
  );

  return res.status(200).json({
    result,
  });
};

export const createExpenseController = async (req: Request, res: Response) => {
  const { title, amount, categoryId, date, notes } = req.body;
  const id = (req as AuthenticatedRequest).userId;
  const result = await createExpenseService(
    id,
    title,
    categoryId,
    amount,
    date,
    notes,
  );

  return res.status(200).json({
    result,
  });
};

export const updateExpenseController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, amount, categoryId, date, notes } = req.body;

  const result = await updateExpenseService(id as string, {
    title,
    amount,
    categoryId,
    date,
    notes,
  });

  return res.status(200).json(result);
};

export const deleteExpenseController = async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await deleteExpenseService(id as string);
  return res.status(200).json(result);
};

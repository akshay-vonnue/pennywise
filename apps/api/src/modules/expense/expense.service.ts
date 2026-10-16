import prisma from "../../utils/prisma";
import type { Expense } from "../../generated/prisma/client";
import { CustomError } from "../../utils/Error";

export const FetchExpensesService = async (
  userId: string,
  search?: string,
  category?: string,
  start_time?: string,
  end_time?: string,
) => {
  const startTime = start_time ? new Date(start_time) : undefined;
  const endTime = end_time ? new Date(end_time).toISOString() : undefined;

  const whereClause: any = {
    userId,
    ...(search && {
      title: {
        contains: search as string,
        mode: "insensitive",
      },
    }),
    ...(category && {
      categoryId: category as string,
    }),
    ...((startTime || endTime) && {
      date: {
        ...(startTime && { gt: startTime }),
        ...(endTime && { lt: endTime }),
      },
    }),
  };

  console.log(whereClause);

  const expenses = await prisma.expense.findMany({
    where: whereClause,
  });

  return expenses;
};

export const createExpenseService = async (
  userId: string,
  title: string,
  categoryId: string,
  amount: number,
  date: string,
  notes?: string,
) => {
  console.log(date);

  const expense = await prisma.expense.create({
    data: {
      title,
      amount,
      notes,
      date: parseInt(date, 10),
      category: {
        connect: {
          id: categoryId,
        },
      },
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });

  return expense;
};

export const updateExpenseService = async (
  expenseId: string,
  updates: Partial<Expense>,
) => {
  const isExistingExpense = await prisma.expense.findUnique({
    where: {
      id: expenseId,
    },
  });

  if (!isExistingExpense) throw new CustomError(404, "Expense not found");

  const expense = await prisma.expense.update({
    where: {
      id: expenseId,
    },
    data: {
      ...updates,
    },
  });

  return expense;
};

export const deleteExpenseService = async (id: string) => {
  const expense = await prisma.expense.findUnique({
    where: { id },
  });

  if (!expense) throw new CustomError(404, "Expense not found");

  const result = await prisma.expense.delete({
    where: {
      id,
    },
  });

  return result;
};

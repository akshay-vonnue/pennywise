import { beforeAll, describe, expect, it } from "vitest";
import prisma from "../utils/prisma";
import {
  createExpenseService,
  deleteExpenseService,
  FetchExpensesService,
  updateExpenseService,
} from "../modules/expense/expense.service";

describe("CRUD operations for the expense table", () => {
  let categoryId: string;
  let userId: string;
  let expenseId: string;

  beforeAll(async () => {
    await prisma.expense.deleteMany();
    await prisma.category.deleteMany();
    await prisma.user.deleteMany();

    const category = await prisma.category.create({
      data: {
        name: "GYM",
      },
    });

    const user = await prisma.user.create({
      data: {
        name: "user1",
        email: "user1@gmail.com",
        passwordHash:
          "$2b$10$Qd7TXUOBTSYZHHDfGtHgm.qQwTu5XYaLFud3dMxif/kgsNpLeBKkS",
        role: "CUSTOMER",
      },
    });

    categoryId = category.id;
    userId = user.id;
  });

  it("should create a expense", async () => {
    const result = await createExpenseService(
      userId,
      "title",
      categoryId,
      1000,
      "2026-10-16T12:36",
    );

    expenseId = result.id;
    expect(result.id).toBeTruthy();
  });

  it("should return all the expenses", async () => {
    const result = await FetchExpensesService(userId);
    expect(result.length).toBe(1);
  });

  it("should return expenses from a time range", async () => {
    const result = await FetchExpensesService(
      userId,
      "t",
      categoryId,
      "2026-09-16T12:36",
      "2026-12-16T12:36",
    );
    expect(result.length).toBe(1);

    const result2 = await FetchExpensesService(
      userId,
      "invalid-search-keyword",
      categoryId,
      "2026-09-16T12:36",
      "2026-12-16T12:36",
    );
  });

  it("it should update an expense", async () => {
    const result = await updateExpenseService(expenseId, {
      title: "new title",
    });

    expect(result.title).toBe("new title");
  });

  it("it should throw expense not found", async () => {
    await expect(
      updateExpenseService(expenseId + "invalid", {
        title: "new title",
      }),
    ).rejects.toThrow("Expense not found");
  });

  it("it should delete an expense", async () => {
    const result = await deleteExpenseService(expenseId);
    expect(result).toBeTruthy();
  });

  it("it should delete an expense", async () => {
    await expect(deleteExpenseService(expenseId + "invalid")).rejects.toThrow(
      "Expense not found",
    );
  });
});

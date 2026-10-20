import { createContext, useContext, useEffect, useState } from "react";
import { useExpense } from "./useExpense";
import { ExpenseContextType } from "@/lib/types";

export const ExpenseContext = createContext<ExpenseContextType | undefined>(
  undefined,
);

export const useExpenseContext = () => {
  console.log("useExpenseContext called");
  const { fetchExpenses, expenses } = useExpense();
  const [fetchDataController, setFetchDataController] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      await fetchExpenses();
      console.log("expenses fetched");
    };
    console.log("2");
    console.log("fetching expenses...");
    fetchData();
  }, [fetchDataController]);

  console.log("1");
  return {
    expenses,
    fetchDataController,
    setFetchDataController,
  };
};

export const expenseManager = () => {
  const expenses = useContext(ExpenseContext);
  console.log(expenses);
  if (expenses === undefined) {
    throw new Error("useExpense context can't work without ExpenseContext");
  }
  return expenses;
};

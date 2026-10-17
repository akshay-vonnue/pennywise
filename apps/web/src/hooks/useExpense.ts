import { useState } from "react";
import toast from "react-hot-toast";

export type Expense = {
  id: string;
  title: string;
  amount: string;
  userId: string;
  categoryId: string;
  date: Date;
  notes?: string;
};

const token = localStorage.getItem("token");

export const useExpense = () => {
  const [expenses, setExpenses] = useState<Expense>();
  const [errorMessages, setErrorMessages] = useState("");

  const fetchExpenses = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/expense`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (!res.ok) {
      setErrorMessages(data.message);
    } else {
      setExpenses(data.result);
    }
  };

  const addExpense = async (payload: Partial<Expense>) => {
    console.log(payload);

    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/expense`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) {
      console.log("toasting error");
      toast.error(data.message);
      setErrorMessages(data.message);
    } else {
      console.log("toasting success");
      toast.success(`expense added successfully`);
    }
  };

  const deleteExpense = async (id: string) => {
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/expense/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const data = await res.json();
    if (!res.ok) {
      setErrorMessages(data.message);
    }
  };

  const updateExpense = async (id: string, payload: Partial<Expense>) => {
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/expense/${id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      },
    );

    const data = await res.json();

    if (!res.ok) {
      setErrorMessages(data.message);
    }
  };

  return {
    fetchExpenses,
    addExpense,
    deleteExpense,
    updateExpense,
    expenses,
    errorMessages,
  };
};

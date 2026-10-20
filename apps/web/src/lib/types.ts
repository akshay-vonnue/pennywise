export type User = {
  id: string;
  name: string;
  email: string;
};

export type Expense = {
  id: string;
  title: string;
  amount: string;
  userId: string;
  categoryId: string;
  date: Date;
  notes?: string;
};

export type ExpenseContextType = {
  expenses: Expense[];
  counter: number;
  setFetchDataController: React.Dispatch<React.SetStateAction<number>>;
};

export type Category = {
  id: string;
  name: string;
};

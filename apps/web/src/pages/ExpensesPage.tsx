import { DatePickerWithRange } from "@/components/ui/DatePickerWithRange";
import { useExpense } from "@/hooks/useExpense";
import { expenseManager } from "@/hooks/useExpenseContext";
import { Input } from "@base-ui/react/input";
import { addDays } from "date-fns";
import { Pencil, Trash } from "lucide-react";
import React from "react";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import Modal from "./Modal";
import { type Expense } from "@/lib/types";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import { fetchCategories } from "@/lib/categories";

function ExpensesPage() {
  useDocumentTitle({ title: "expenses" });
  const [modalOpen, setModalOpen] = useState(false);
  const { expenses, counter, setFetchDataController } = expenseManager();
  const { deleteExpense } = useExpense();
  const [currentEditableExpense, setCurrentEditableExpense] = useState<Expense>(
    expenses[0],
  );

  const categories = fetchCategories();

  const [selectedCategory, setSelectedCategory] = useState("ALL");

  const filterdExpenses = expenses.filter((expense) => {
    if (selectedCategory === "ALL") return true;

    console.log(selectedCategory);
    return expense.categoryId === selectedCategory;
  });

  console.log("filtered expenses:", filterdExpenses);

  function resolveCategory(id: string) {
    return categories.find((cat) => cat.id === id);
  }

  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), 0, 20),
    to: addDays(new Date(new Date().getFullYear(), 0, 20), 20),
  });

  const handleDelete = async (id: string) => {
    await deleteExpense(id);
    setFetchDataController(counter + 1);
  };

  const handleEdit = (expense: Expense) => {
    setCurrentEditableExpense(expense);
    setModalOpen(true);
  };

  return (
    <div className="bg-emerald-000 col-span-5 p-4">
      {modalOpen ? (
        <Modal expense={currentEditableExpense} setModalOpen={setModalOpen} />
      ) : (
        <div>
          <div className="flex justify-between p-2 text-white items-center">
            <div className="flex flex-col">
              <h1 className="text-3xl">Expenses</h1>
              <p className="text-[10px]">View and manage your expenses</p>
            </div>
            <Input
              type="search"
              className="w-1/3 h-1/2 p-2 bg-white rounded-sm text-black"
              placeholder="Search expense by title"
            />
          </div>
          <div className="flex gap-4 items-baseline text-white">
            <select
              name=""
              id=""
              className="bg-white px-5 py-2 rounded-md text-black"
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="ALL">ALL</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <DatePickerWithRange setDate={setDate} date={date} />
            <button type="button" className="text-red-600">
              clear
            </button>
          </div>

          <div className="grid grid-cols-6 content-start overflow-scroll place-items-center mt-16 bg-white rounded-md gap-4 p-2 min-h-88">
            <div className="font-bold text-black-300">id</div>
            <div className="font-bold text-black-300">title</div>
            <div className="font-bold text-black-300">Category</div>
            <div className="font-bold text-black-300">amount</div>
            <div className="font-bold text-black-300">Date</div>
            <div className="font-bold text-black-300">Actions</div>

            {filterdExpenses.map((expense) => (
              <React.Fragment key={expense.id}>
                <div>
                  {expense.id.substring(0, 2) +
                    ".." +
                    expense.id.substring(
                      expense.id.length - 2,
                      expense.id.length,
                    )}
                </div>
                <div>{expense.title}</div>
                <div>{String(resolveCategory(expense.categoryId)?.name)}</div>
                <div>{expense.amount}</div>
                <div>{new Date(expense.date).toLocaleDateString()}</div>
                <div className="flex gap-4">
                  <Pencil onClick={() => handleEdit(expense)} />
                  <Trash
                    className="text-red-500"
                    onClick={() => handleDelete(expense.id)}
                  />
                </div>
              </React.Fragment>
            ))}
            {filterdExpenses.length === 0 && (
              <div className="flex col-span-6 mt-8 text-red-400">
                <div>no records found</div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ExpensesPage;

import { ChartPieDonutText } from "@/components/ui/ChartPieDonutText";
import { DatePickerWithRange } from "@/components/ui/DatePickerWithRange";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import { expenseManager } from "@/hooks/useExpenseContext";
import { fetchCategories } from "@/lib/categories";
import { addDays } from "date-fns";
import { PiggyBank, Wallet } from "lucide-react";
import React, { useState } from "react";
import { DateRange } from "react-day-picker";

function Dashboard() {
  useDocumentTitle({ title: "Dashboard" });
  const { expenses } = expenseManager();
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), 0, 20),
    to: addDays(new Date(new Date().getFullYear(), 0, 20), 20),
  });

  const categorySum = expenses.reduce<Record<string, number>>((acc, item) => {
    acc[item.categoryId] = (acc[item.categoryId] || 0) + Number(item.amount);
    return acc;
  }, {});

  const categories = fetchCategories();

  function categoryIdToNameResolver(id: string) {
    return categories.find((cat) => cat.id === id);
  }

  function resolveCategory(id: string) {
    return categories.find((cat) => cat.id === id);
  }

  const CategoryMap = Object.entries(categorySum).map((item) => ({
    category: categoryIdToNameResolver(item[0])?.name,
    amount: item[1],
    fill: `var(--color-${categoryIdToNameResolver(item[0])?.name})`,
  }));

  const largestCategory = Object.entries(categorySum).sort(
    (a, b) => Number(b[1]) - Number(a[1]),
  )[0];

  console.log("largest is:", largestCategory);

  console.log(categorySum);

  let totalAmount = expenses.reduce(
    (prev, next) => prev + Number(next.amount),
    0,
  );

  return (
    <div className="col-span-5 flex flex-col">
      <div className="flex justify-between p-2 px-4 text-white">
        <div className="flex flex-col">
          <h1 className="text-3xl">Dashboard</h1>
          <p>Track your expense</p>
        </div>
        <DatePickerWithRange date={date} setDate={setDate} />
      </div>
      <div className="flex p-2 px-4 gap-8 h-50">
        <div className="flex flex-col justify-around border bg-white p-8 rounded-md w-2/5">
          <div className="bg-emerald-300 w-fit p-2 rounded-full">
            <Wallet className="text-white" />
          </div>
          <div className="text-xl">
            Total Amount:{" "}
            <span className="text-4xl text-emerald-700">{totalAmount}</span>
          </div>
        </div>
        <div className="flex flex-col justify-around border bg-white p-8 rounded-md w-3/5">
          <div className="bg-blue-400 w-fit p-2 rounded-full">
            <PiggyBank className="text-white" />
          </div>
          <div className="text-xl">
            Total Transactions:{" "}
            <span className="text-4xl text-blue-700">{expenses.length}</span>
          </div>
        </div>
        <div className="flex flex-col justify-around border bg-white p-8 rounded-md w-3/5">
          <div className="flex items-center gap-4">
            <div className="bg-blue-400 w-fit p-2 rounded-full">
              <PiggyBank className="text-white" />
            </div>
            <div>
              {largestCategory &&
                categoryIdToNameResolver(largestCategory[0])?.name}
            </div>
          </div>
          <div className="text-xl">
            Most Spend:{" "}
            <span className="text-4xl text-indigo-700">
              {largestCategory ? largestCategory[1] : 0}
            </span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 flex-1">
        <ChartPieDonutText expenses={expenses} CategoryMap={CategoryMap} />

        <div className="grid grid-cols-4 m-4 content-start overflow-scroll place-items-center bg-white rounded-md gap-2 p-2 flex-1 max-h-full">
          <div className="font-bold text-black-300">title</div>
          <div className="font-bold text-black-300">Category</div>
          <div className="font-bold text-black-300">amount</div>
          <div className="font-bold text-black-300">Date</div>

          {expenses.map((expense) => (
            <React.Fragment key={expense.id}>
              <div>{expense.title}</div>
              <div>{String(resolveCategory(expense.categoryId)?.name)}</div>
              <div>{expense.amount}</div>
              <div>{new Date(expense.date).toLocaleDateString()}</div>
            </React.Fragment>
          ))}
          {expenses.length === 0 && (
            <div className="flex col-span-6 mt-8 text-red-400">
              <div>no records found</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

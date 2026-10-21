import { ChartPieDonutText } from "@/components/ui/ChartPieDonutText";
import { DatePickerWithRange } from "@/components/ui/DatePickerWithRange";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import { expenseManager } from "@/hooks/useExpenseContext";
import { addDays } from "date-fns";
import { PiggyBank, Wallet } from "lucide-react";
import { useState } from "react";
import { DateRange } from "react-day-picker";

function Dashboard() {
  useDocumentTitle({title:"Dashboard"})
  const { expenses } = expenseManager();
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), 0, 20),
    to: addDays(new Date(new Date().getFullYear(), 0, 20), 20),
  });

  let totalAmount = expenses.reduce(
    (prev, next) => prev + Number(next.amount),
    0,
  );

  return (
    <div className="col-span-5">
      <div className="flex justify-between p-2 px-4 text-white">
        <div className="flex flex-col">
          <h1 className="text-3xl">Dashboard</h1>
          <p>Track your expense</p>
        </div>
        <DatePickerWithRange date={date} setDate={setDate} />
      </div>
      <div className="flex p-2 px-4 gap-8">
        <div className="border bg-white p-8 rounded-md w-1/5">
          <div className="bg-emerald-300 w-fit p-2 rounded-full">
            <Wallet className="text-white" />
          </div>
          <div className="text-xl">
            Total Amount:{" "}
            <span className="text-4xl text-emerald-700">{totalAmount}</span>
          </div>
        </div>
        <div className="border bg-white p-8 rounded-md w-3/5">
          <div className="bg-blue-400 w-fit p-2 rounded-full">
            <PiggyBank className="text-white" />
          </div>
          <div className="text-xl">
            Total Transactions:{" "}
            <span className="text-4xl text-blue-700">{expenses.length}</span>
          </div>
        </div>
      </div>
      <ChartPieDonutText expenses={expenses} />
    </div>
  );
}

export default Dashboard;

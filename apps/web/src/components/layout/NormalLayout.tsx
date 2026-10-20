import { Outlet } from "react-router";
import Sidebar from "./Sidebar";
import { Toaster } from "react-hot-toast";
import { ExpenseContext, useExpenseContext } from "@/hooks/useExpenseContext";
import { getCategories } from "@/lib/categories";

function NormalLayout() {
  console.log("rendering normal layout");
  // const { expenses, setFetchDataController } = useExpenseContext();
  // console.log(expenses);
  return (
    <div className="grid grid-cols-6 bg-emerald-950">
      {/* <ExpenseContext.Provider value={expenses}> */}
        <Sidebar />
        <Outlet />
        <Toaster position="bottom-right" />
      {/* </ExpenseContext.Provider> */}
    </div>
  );
}

export default NormalLayout;
import { Outlet, useNavigate } from "react-router";
import Sidebar from "./Sidebar";
import { Toaster } from "react-hot-toast";
import { AuthContext } from "@/hooks/useAuthContext";
import { ExpenseContext, useExpenseContext } from "@/hooks/useExpenseContext";

function NormalLayout() {
  const navigate = useNavigate();
  console.log("rendering normal layout");
  const { expenses, fetchDataController, setFetchDataController } =
    useExpenseContext();
  const user = localStorage.getItem("user") as string;

  if (!user) {
    navigate("/auth/login");
    return;
  }
  return (
    <div className="grid grid-cols-6 bg-emerald-950">
      <AuthContext.Provider value={JSON.parse(user)}>
        <ExpenseContext.Provider
          value={{
            expenses,
            counter: fetchDataController,
            setFetchDataController,
          }}
        >
          <Sidebar />
          <Outlet />
          <Toaster position="bottom-right" />
        </ExpenseContext.Provider>
      </AuthContext.Provider>
    </div>
  );
}

export default NormalLayout;

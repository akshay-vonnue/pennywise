import { Outlet, useNavigate } from "react-router";
import Sidebar from "./Sidebar";
import { Toaster } from "react-hot-toast";
import { AuthContext } from "@/hooks/useAuthContext";
import { ExpenseContext, useExpenseContext } from "@/hooks/useExpenseContext";
import { useEffect } from "react";

function NormalLayout() {
  const navigate = useNavigate();
  console.log("rendering normal layout");
  const { expenses, fetchDataController, setFetchDataController } =
    useExpenseContext();
  const user = localStorage.getItem("user") as string;
  const token = localStorage.getItem("token") as string;
  console.log("inside normal layout:", token);
  console.log(token);
  useEffect(() => {
    async function verifyToken() {
      const res = await fetch(`http://localhost:8000/auth/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        navigate("/auth/login", { replace: true });
      }
    }

    verifyToken();
  });

  if (!user && !token) {
    navigate("/auth/login");
    return;
  }

  return (
    <div className="grid grid-cols-6 bg-emerald-950 w-full h-full">
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

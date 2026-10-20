import { createRoot } from "react-dom/client";
import "./style.css";
import { RouterProvider } from "react-router";
import router from "./routes/Router";
import { ExpenseContext, useExpenseContext } from "./hooks/useExpenseContext";
import { getCategories } from "./lib/categories";

const App = () => {
  const { expenses, fetchDataController, setFetchDataController } =
    useExpenseContext();
  getCategories();
  return (
    <div>
      <ExpenseContext.Provider
        value={{ expenses, setFetchDataController,counter:fetchDataController }}
      >
        <RouterProvider router={router} />
      </ExpenseContext.Provider>
    </div>
  );
};
~createRoot(document.getElementById("app")!).render(<App />);

import { createRoot } from "react-dom/client";
import "./style.css";
import { BrowserRouter, Route, Routes } from "react-router";
import { getCategories } from "./lib/categories";
import LoginPage from "./pages/Login";
import AuthLayout from "./components/layout/AuthLayout";
import NormalLayout from "./components/layout/NormalLayout";
import Dashboard from "./pages/Dashboard";
import AddExpensePage from "./pages/AddExpensePage";
import ExpensesPage from "./pages/ExpensesPage";
import SignupPage from "./pages/SignupPage";

const App = () => {
  getCategories();
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="/auth/login" element={<LoginPage />} />
            <Route path="/auth/signup" element={<SignupPage />} />
          </Route>
          <Route element={<NormalLayout />}>
            <Route path="/" element={ <Dashboard/>} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/add" element={<AddExpensePage />} />
            <Route path="/expenses" element={<ExpensesPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

createRoot(document.getElementById("app")!).render(<App />);

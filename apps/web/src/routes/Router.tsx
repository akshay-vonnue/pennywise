import { lazy } from "react";
import { createBrowserRouter } from "react-router";
import Loadable from "./Loadable";

const NormalLayout = Loadable(
  lazy(() => import("../components/layout/NormalLayout")),
);
const AuthLayout = Loadable(
  lazy(() => import("../components/layout/AuthLayout")),
);

const LoginPage = Loadable(lazy(() => import("../pages/Login")));
const Dashboard = Loadable(lazy(() => import("../pages/Dashboard")));
const ExpensesPage = Loadable(lazy(() => import("../pages/ExpensesPage")));
const AddExpensePage = Loadable(lazy(() => import("../pages/AddExpensePage")));

const Router = [
  {
    path: "/",
    element: NormalLayout,
    children: [
      { path: "/dashboard", element: Dashboard },
      { path: "/expenses", element: ExpensesPage },
      { path: "/add", element: AddExpensePage },
    ],
  },
  {
    path: "/",
    element: AuthLayout,
    children: [{ path: "/auth/login", element: LoginPage }],
  },
  {
    path: "*",
    element: <div>not found</div>,
  },
];

const router = createBrowserRouter(Router);

export default router;

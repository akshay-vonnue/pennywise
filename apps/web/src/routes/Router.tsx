import { lazy } from "react";
import { createBrowserRouter } from "react-router";
import Loadable from "./Loadable";

const NormalLayout = Loadable(
  lazy(() => import("../components/layout/NormalLayout")),
);
const AuthLayout = Loadable(
  lazy(() => import("../components/layout/AuthLayout")),
);

const MyPage = Loadable(lazy(() => import("../pages/MyPage")));
const AuthPage = Loadable(lazy(() => import("../pages/AuthPage")));

const Router = [
  {
    path: "/",
    element: NormalLayout,
    children: [{ path: "/my-feature", element: MyPage }],
  },
  {
    path: "/",
    element: AuthLayout,
    children: [{ path: "/auth/login", element: AuthPage }],
  },
  {
    path: "*",
    element: <div>not found</div>,
  },
];

const router = createBrowserRouter(Router);

export default router;

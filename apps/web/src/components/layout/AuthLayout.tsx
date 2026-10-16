import { Outlet } from "react-router";
import Sidebar from "./Sidebar";

function AuthLayout() {
  return (
    <div className="grid grid-cols-6">
      <Sidebar />
      <Outlet />
    </div>
  );
}

export default AuthLayout;

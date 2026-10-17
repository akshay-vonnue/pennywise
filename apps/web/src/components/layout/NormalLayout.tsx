import { Outlet } from "react-router";
import Sidebar from "./Sidebar";
import { Toaster } from "react-hot-toast";

function NormalLayout() {
  return (
    <div className="grid grid-cols-6 bg-emerald-950">
      <Sidebar />
      <Outlet />
      <Toaster position="bottom-right"/>
    </div>
  );
}

export default NormalLayout;

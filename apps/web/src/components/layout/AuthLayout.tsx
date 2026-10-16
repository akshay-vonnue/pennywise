import { Outlet } from "react-router";
import { Toaster } from "react-hot-toast";

function AuthLayout() {
  return (
    <div className="w-full h-screen flex justify-center items-center bg-emerald-800 text-white">
      <Outlet />
      <Toaster position="bottom-right"/>
    </div>
  );
}

export default AuthLayout;

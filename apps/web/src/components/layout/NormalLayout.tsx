import { Outlet } from "react-router";

function NormalLayout() {
  return (
    <div>
      NormalLayout
      <Outlet />
    </div>
  );
}

export default NormalLayout;

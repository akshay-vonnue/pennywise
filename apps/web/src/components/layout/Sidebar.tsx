import { Link } from "react-router";
import logo from "/logo.png";

const paths = [
  {
    name: "Dashboard",
    url: "/dashboard",
  },
  {
    name: "Expenses",
    url: "/expenses",
  },
  {
    name: "Add",
    url: "/add",
  },
];

function Sidebar() {
  return (
    <div className="col-span-1 h-screen bg-emerald-900 rounded-r-md">
      <div className="flex items-center gap-4">
        <img src={logo} alt="logo" className="w-13 m-3" />
        <h1 className="text-white font-bold text-2xl">PennyWise</h1>
      </div>
      <div className="flex flex-col items-center gap-8 mt-8 text-white">
        {paths.map((path) => (
          <Link to={path.url}>{path.name}</Link>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;

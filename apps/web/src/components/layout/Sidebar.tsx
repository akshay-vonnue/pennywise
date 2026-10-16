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
    <div className="col-span-1 h-screen bg-emerald-800 rounded-r-md">
      <div className="flex items-center border-b-2 border-b-amber-300">
        <img src={logo} alt="logo" className="w-13 m-3" />
        <h1 className="text-white font-bold">PennyWise expense tracker</h1>
      </div>
      <div className="flex flex-col items-center gap-4 mt-4 text-white">
        {paths.map((path) => (
          <Link to={path.url}>{path.name}</Link>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;

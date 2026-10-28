import { Link } from "react-router";
import logo from "/logo.png";
import { useAuthContext } from "@/hooks/useAuthContext";
import { AvatarDropdown } from "../ui/AvatarDropdown";

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
  const user = useAuthContext();
  return (
    <div className="col-span-1 h-screen bg-emerald-900 rounded-r-md flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-4">
          <img src={logo} alt="logo" className="min-w-[18%] max-w-[20%] my-3 mx-1" />
          <h1 className="text-white font-bold text-2xl">PennyWise</h1>
        </div>
        <div className="flex flex-col items-center gap-8 mt-8 text-white">
          {paths.map((path) => (
            <Link key={path.name} to={path.url}>
              {path.name}
            </Link>
          ))}
        </div>
      </div>
      <div className="flex w-full justify-center items-center gap-4 mb-12 p-3">
        <AvatarDropdown imageUrl="https://raw.githubusercontent.com/antony-akshay/solana/refs/heads/main/nft/json-data/hue.png" />
        <div className="text-white">{user.name}</div>
      </div>
    </div>
  );
}

export default Sidebar;

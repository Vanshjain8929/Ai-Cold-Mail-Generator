import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  History,
  User,
  LogOut,
  Sparkles,
  ChevronRight,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const menu = [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "History",
      path: "/history",
      icon: History,
    },
    {
      title: "Profile",
      path: "/profile",
      icon: User,
    },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="w-72 bg-slate-900 text-white flex flex-col shadow-2xl">

      {/* Logo */}

      <div className="h-24 border-b border-slate-800 flex items-center px-8">

        <div className="h-14 w-14 rounded-xl bg-blue-600 flex items-center justify-center">

          <Sparkles size={28} />

        </div>

        <div className="ml-4">

          <h1 className="text-xl font-bold">

            AI Cold Mail

          </h1>

          <p className="text-slate-400 text-sm">

            AI Powered

          </p>

        </div>

      </div>

      {/* Menu */}

      <div className="flex-1 p-5 space-y-3">

        {menu.map((item) => {

          const Icon = item.icon;

          const active = location.pathname === item.path;

          return (

            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center justify-between rounded-xl px-5 py-4 transition-all duration-200 ${
                active
                  ? "bg-blue-600"
                  : "hover:bg-slate-800"
              }`}
            >

              <div className="flex items-center gap-4">

                <Icon size={21} />

                <span className="font-medium">

                  {item.title}

                </span>

              </div>

              <ChevronRight size={18} />

            </Link>

          );

        })}

      </div>

      {/* User */}

      <div className="border-t border-slate-800 p-5">

        <div className="flex items-center gap-4 bg-slate-800 rounded-xl p-4">

          <div className="h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center text-lg font-bold">

            {user?.username?.charAt(0).toUpperCase()}

          </div>

          <div className="flex-1">

            <h3 className="font-semibold">

              {user?.username}

            </h3>

            <p className="text-xs text-slate-400 truncate">

              {user?.email}

            </p>

          </div>

        </div>

        <button
          onClick={handleLogout}
          className="w-full mt-5 bg-red-600 hover:bg-red-700 rounded-xl py-3 flex justify-center items-center gap-2 transition"
        >

          <LogOut size={18} />

          Logout

        </button>

      </div>

    </aside>
  );
}
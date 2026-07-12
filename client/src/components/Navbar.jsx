import { Bell, Search } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user } = useAuth();

  return (
    <header className="bg-white border-b h-20 px-8 flex items-center justify-between sticky top-0 z-20">

      {/* Left */}

      <div>

        <h1 className="text-2xl font-bold text-gray-800">
          AI Cold Mail Generator
        </h1>

        <p className="text-sm text-gray-500">
          Welcome back, {user?.username} 👋
        </p>

      </div>

      {/* Right */}

      <div className="flex items-center gap-5">

        {/* Search */}

        <div className="hidden lg:flex items-center bg-gray-100 rounded-xl px-4 py-2 w-72">

          <Search
            size={18}
            className="text-gray-500"
          />

          <input
            placeholder="Search..."
            className="bg-transparent outline-none ml-3 flex-1"
          />

        </div>

        {/* Notification */}

        <button className="relative h-11 w-11 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center">

          <Bell size={20} />

          <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full"></span>

        </button>

        {/* User */}

        <div className="flex items-center gap-3 bg-gray-100 rounded-xl px-3 py-2">

          <div className="h-10 w-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">

            {user?.username?.charAt(0).toUpperCase()}

          </div>

          <div className="hidden md:block">

            <h3 className="font-semibold">

              {user?.username}

            </h3>

            <p className="text-xs text-gray-500">

              {user?.email}

            </p>

          </div>

        </div>

      </div>

    </header>
  );
}
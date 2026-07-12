import { Bell, Search } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user } = useAuth();

  return (
    <header className="bg-white border-b shadow-sm px-8 py-4">

      <div className="flex items-center justify-between">

        {/* Left */}

        <div>

          <h1 className="text-2xl font-bold text-gray-800">
            AI Cold Mail Generator
          </h1>

          <p className="text-gray-500 mt-1">
            Welcome back, {user?.username}
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
              type="text"
              placeholder="Search..."
              className="bg-transparent ml-3 outline-none w-full"
            />

          </div>

          {/* Notification */}

          <button className="relative p-2 rounded-xl hover:bg-gray-100 transition">

            <Bell size={22} />

            <span className="absolute top-1 right-1 h-2.5 w-2.5 rounded-full bg-red-500"></span>

          </button>

          {/* Avatar */}

          <div className="h-12 w-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg shadow">

            {user?.username?.charAt(0).toUpperCase()}

          </div>

        </div>

      </div>

    </header>
  );
}
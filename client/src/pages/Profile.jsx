import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { useAuth } from "../context/AuthContext";
import api from "../api/api";

import {
  User,
  Mail,
  Shield,
  Calendar,
} from "lucide-react";

export default function Profile() {
  const { user } = useAuth();

  const [totalEmails, setTotalEmails] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/ai/history");
        setTotalEmails(res.data.length);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStats();
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-8">

        {/* Header */}

        <div>
          <h1 className="text-4xl font-bold">
            My Profile
          </h1>

          <p className="text-gray-500 mt-2">
            Manage your account information.
          </p>
        </div>

        {/* User Card */}

        <div className="bg-white rounded-2xl shadow-lg p-8">

          <div className="flex items-center gap-6">

            <div className="h-24 w-24 rounded-full bg-blue-600 flex items-center justify-center text-white text-4xl font-bold">

              {user?.username?.charAt(0).toUpperCase()}

            </div>

            <div>

              <h2 className="text-3xl font-bold">

                {user?.username}

              </h2>

              <p className="text-gray-500">

                {user?.email}

              </p>

            </div>

          </div>

        </div>

        {/* Information Cards */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div className="bg-white rounded-xl shadow p-6">

            <div className="flex items-center gap-3">

              <User className="text-blue-600" />

              <h3 className="font-semibold text-lg">
                Username
              </h3>

            </div>

            <p className="mt-4 text-gray-700">

              {user?.username}

            </p>

          </div>

          <div className="bg-white rounded-xl shadow p-6">

            <div className="flex items-center gap-3">

              <Mail className="text-blue-600" />

              <h3 className="font-semibold text-lg">
                Email
              </h3>

            </div>

            <p className="mt-4 text-gray-700">

              {user?.email}

            </p>

          </div>

          <div className="bg-white rounded-xl shadow p-6">

            <div className="flex items-center gap-3">

              <Shield className="text-green-600" />

              <h3 className="font-semibold text-lg">
                Account Status
              </h3>

            </div>

            <p className="mt-4 text-green-600 font-semibold">

              Verified

            </p>

          </div>

          <div className="bg-white rounded-xl shadow p-6">

            <div className="flex items-center gap-3">

              <Calendar className="text-purple-600" />

              <h3 className="font-semibold text-lg">
                Emails Generated
              </h3>

            </div>

            <p className="mt-4 text-3xl font-bold text-gray-800">

              {totalEmails}

            </p>

          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}
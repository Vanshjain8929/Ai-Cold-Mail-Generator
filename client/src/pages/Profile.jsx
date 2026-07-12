import { useEffect, useState } from "react";
import {
  User,
  Mail,
  Calendar,
  FileText,
  Bot,
  Shield,
} from "lucide-react";

import DashboardLayout from "../layouts/DashboardLayout";
import { useAuth } from "../context/AuthContext";
import api from "../api/api";

export default function Profile() {
  const { user } = useAuth();

  const [stats, setStats] = useState({
    totalEmails: 0,
  });

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await api.get("/ai/history");

      setStats({
        totalEmails: res.data.length,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">

        {/* Hero */}

        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">

          <h1 className="text-4xl font-bold">
            My Profile
          </h1>

          <p className="text-blue-100 mt-2">
            Manage your AI Cold Mail account.
          </p>

        </div>

        {/* Profile */}

        <div className="bg-white rounded-2xl shadow p-10">

          <div className="flex flex-col md:flex-row items-center gap-8">

            <div className="h-32 w-32 rounded-full bg-blue-600 text-white flex items-center justify-center text-5xl font-bold">

              {user?.username?.charAt(0).toUpperCase()}

            </div>

            <div className="flex-1">

              <h2 className="text-3xl font-bold">

                {user?.username}

              </h2>

              <p className="text-gray-500 mt-2">

                AI Cold Mail User

              </p>

            </div>

          </div>

        </div>

        {/* Stats */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white rounded-xl shadow p-6">

            <Mail className="text-blue-600" />

            <p className="text-gray-500 mt-4">

              Email

            </p>

            <h2 className="font-semibold mt-1">

              {user?.email}

            </h2>

          </div>

          <div className="bg-white rounded-xl shadow p-6">

            <FileText className="text-green-600" />

            <p className="text-gray-500 mt-4">

              Emails Generated

            </p>

            <h2 className="text-3xl font-bold">

              {stats.totalEmails}

            </h2>

          </div>

          <div className="bg-white rounded-xl shadow p-6">

            <Bot className="text-purple-600" />

            <p className="text-gray-500 mt-4">

              AI Model

            </p>

            <h2 className="font-bold">

              Llama 3.3

            </h2>

          </div>

          <div className="bg-white rounded-xl shadow p-6">

            <Shield className="text-orange-500" />

            <p className="text-gray-500 mt-4">

              Account Status

            </p>

            <h2 className="font-bold text-green-600">

              Verified

            </h2>

          </div>

        </div>

        {/* Account Information */}

        <div className="bg-white rounded-xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">

            Account Information

          </h2>

          <div className="grid md:grid-cols-2 gap-8">

            <div className="flex items-center gap-4">

              <User className="text-blue-600" />

              <div>

                <p className="text-gray-500">

                  Username

                </p>

                <h3 className="font-semibold">

                  {user?.username}

                </h3>

              </div>

            </div>

            <div className="flex items-center gap-4">

              <Mail className="text-blue-600" />

              <div>

                <p className="text-gray-500">

                  Email

                </p>

                <h3 className="font-semibold">

                  {user?.email}

                </h3>

              </div>

            </div>

            <div className="flex items-center gap-4">

              <Calendar className="text-blue-600" />

              <div>

                <p className="text-gray-500">

                  Joined

                </p>

                <h3 className="font-semibold">

                  Recently

                </h3>

              </div>

            </div>

            <div className="flex items-center gap-4">

              <Bot className="text-blue-600" />

              <div>

                <p className="text-gray-500">

                  AI Provider

                </p>

                <h3 className="font-semibold">

                  Groq + Llama 3.3

                </h3>

              </div>

            </div>

          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}
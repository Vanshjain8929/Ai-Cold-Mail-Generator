import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import {
  Search,
  Copy,
  Download,
  Calendar,
  Mail,
  FileText,
} from "lucide-react";

import api from "../api/api";
import DashboardLayout from "../layouts/DashboardLayout";

export default function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await api.get("/ai/history");
      setHistory(res.data);
    } catch (err) {
      toast.error("Failed to fetch history");
    } finally {
      setLoading(false);
    }
  };

  const filteredHistory = useMemo(() => {
    return history.filter((item) => {
      return (
        item.subject
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        item.prompt
          ?.toLowerCase()
          .includes(search.toLowerCase())
      );
    });
  }, [history, search]);

  const copyEmail = (email) => {
    navigator.clipboard.writeText(email.emailBody);
    toast.success("Email copied");
  };

  const downloadEmail = (email) => {
    const text = `
Subject:
${email.subject}

-----------------------------------

Email:
${email.emailBody}

-----------------------------------

LinkedIn DM:
${email.linkedInDM}

-----------------------------------

Follow Up:
${email.followUpEmail}
`;

    const blob = new Blob([text], {
      type: "text/plain",
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = "generated-email.txt";

    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">

        {/* Header */}

        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl p-8 text-white">

          <h1 className="text-4xl font-bold">
            Email History
          </h1>

          <p className="mt-2 text-blue-100">
            Browse every AI generated email.
          </p>

        </div>

        {/* Search */}

        <div className="bg-white rounded-xl shadow p-5">

          <div className="relative">

            <Search
              className="absolute left-4 top-3 text-gray-400"
              size={20}
            />

            <input
              type="text"
              placeholder="Search by subject or prompt..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full border rounded-lg py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>

        </div>

        {/* Loading */}

        {loading && (
          <div className="bg-white rounded-xl p-12 text-center shadow">
            Loading history...
          </div>
        )}

        {/* Empty */}

        {!loading && filteredHistory.length === 0 && (
          <div className="bg-white rounded-xl shadow p-16 text-center">

            <Mail
              size={50}
              className="mx-auto text-gray-400"
            />

            <h2 className="mt-5 text-2xl font-bold">

              No Emails Found

            </h2>

            <p className="text-gray-500 mt-2">

              Generate your first AI cold email.

            </p>

          </div>
        )}

        {/* Cards */}

        <div className="space-y-6">

          {filteredHistory.map((item) => (

            <div
              key={item._id}
              className="bg-white rounded-xl shadow hover:shadow-lg transition"
            >

              <div className="p-6">

                <div className="flex justify-between items-start">

                  <div>

                    <h2 className="text-xl font-bold">

                      {item.subject}

                    </h2>

                    <div className="flex items-center gap-2 mt-2 text-gray-500 text-sm">

                      <Calendar size={16} />

                      {new Date(
                        item.createdAt
                      ).toLocaleString()}

                    </div>

                  </div>

                  <div className="flex gap-3">

                    <button
                      onClick={() =>
                        copyEmail(item)
                      }
                      className="p-2 rounded-lg bg-blue-100 hover:bg-blue-200"
                    >

                      <Copy size={18} />

                    </button>

                    <button
                      onClick={() =>
                        downloadEmail(item)
                      }
                      className="p-2 rounded-lg bg-green-100 hover:bg-green-200"
                    >

                      <Download size={18} />

                    </button>

                  </div>

                </div>

                <div className="mt-6">

                  <h3 className="font-semibold flex items-center gap-2">

                    <FileText size={18} />

                    Email Preview

                  </h3>

                  <p className="mt-3 text-gray-600 whitespace-pre-wrap line-clamp-5">

                    {item.emailBody}

                  </p>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>
    </DashboardLayout>
  );
}
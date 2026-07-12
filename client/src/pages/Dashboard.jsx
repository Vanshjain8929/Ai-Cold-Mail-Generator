import { useState } from "react";
import toast from "react-hot-toast";
import { Mail, History, Bot } from "lucide-react";

import api from "../api/api";
import DashboardLayout from "../layouts/DashboardLayout";

import Button from "../components/Button";
import PromptInput from "../components/PromptInput";
import EmailCard from "../components/EmailCard";
import StatsCard from "../components/StatsCard";
import PromptTemplates from "../components/PromptTemplates";

import { useAuth } from "../context/AuthContext";
import ResultTabs from "../components/ResultTabs";

export default function Dashboard() {
  const { user } = useAuth();

  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState(null);

  const generateEmail = async () => {
    if (!prompt.trim()) {
      return toast.error("Please enter a prompt");
    }

    try {
      setLoading(true);

      const res = await api.post("/ai/generate-email", {
        prompt,
      });

      setEmail(res.data);

      toast.success("Email generated successfully!");

    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to generate email"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">

        {/* Hero Section */}

        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white shadow-lg">

          <h1 className="text-4xl font-bold">
            Welcome back, {user?.username} 👋
          </h1>

          <p className="mt-3 text-blue-100">
            Generate professional AI-powered cold emails in seconds.
          </p>

        </div>

        {/* Statistics */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <StatsCard
            title="Emails Generated"
            value={email ? 1 : 0}
            icon={Mail}
            color="bg-blue-600"
          />

          <StatsCard
            title="History"
            value="-"
            icon={History}
            color="bg-green-600"
          />

          <StatsCard
            title="AI Model"
            value="Llama 3.3"
            icon={Bot}
            color="bg-purple-600"
          />

        </div>

        {/* Prompt Section */}

        <div className="bg-white rounded-xl shadow-md p-6">

          <PromptInput
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />

          <div className="mt-6">

            <PromptTemplates
              setPrompt={setPrompt}
            />

          </div>

          <div className="mt-6">

            <Button
              loading={loading}
              onClick={generateEmail}
            >
              Generate Email
            </Button>

          </div>

        </div>

        {/* Results */}

        {email && (
          <div className="space-y-6">

            {email && (

              <ResultTabs
                email={email}
                loading={loading}
                onRegenerate={generateEmail}
              />

            )}

          </div>
        )}

      </div>
    </DashboardLayout>
  );
}
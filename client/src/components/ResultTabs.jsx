import { useState } from "react";
import {
  Copy,
  Download,
  RefreshCw,
} from "lucide-react";
import toast from "react-hot-toast";

export default function ResultTabs({
  email,
  onRegenerate,
  loading,
}) {
  const [active, setActive] = useState("subject");

  if (!email) return null;

  const tabs = [
    {
      key: "subject",
      label: "Subject",
      value: email.subject,
    },
    {
      key: "emailBody",
      label: "Email",
      value: email.emailBody,
    },
    {
      key: "linkedInDM",
      label: "LinkedIn",
      value: email.linkedInDM,
    },
    {
      key: "followUpEmail",
      label: "Follow-up",
      value: email.followUpEmail,
    },
  ];

  const current = tabs.find(
    (tab) => tab.key === active
  );

  const copy = () => {
    navigator.clipboard.writeText(current.value);
    toast.success("Copied");
  };

  const copyAll = () => {
    navigator.clipboard.writeText(
`Subject:
${email.subject}

Email:
${email.emailBody}

LinkedIn:
${email.linkedInDM}

Follow Up:
${email.followUpEmail}`
    );

    toast.success("Everything copied");
  };

  const download = () => {
    const text =
`Subject:
${email.subject}

Email:
${email.emailBody}

LinkedIn:
${email.linkedInDM}

Follow Up:
${email.followUpEmail}`;

    const blob = new Blob(
      [text],
      {
        type: "text/plain",
      }
    );

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;

    a.download = "generated-email.txt";

    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">

      <div className="flex border-b">

        {tabs.map((tab) => (

          <button
            key={tab.key}
            onClick={() => setActive(tab.key)}
            className={`px-6 py-4 font-medium transition
            ${
              active === tab.key
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500"
            }`}
          >
            {tab.label}
          </button>

        ))}

      </div>

      <div className="p-8 whitespace-pre-wrap leading-8 min-h-[300px]">

        {current.value}

      </div>

      <div className="border-t p-5 flex gap-3 flex-wrap">

        <button
          onClick={copy}
          className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg"
        >
          <Copy size={18} />
          Copy
        </button>

        <button
          onClick={copyAll}
          className="flex items-center gap-2 bg-green-600 text-white px-5 py-2 rounded-lg"
        >
          <Copy size={18} />
          Copy All
        </button>

        <button
          onClick={download}
          className="flex items-center gap-2 bg-gray-700 text-white px-5 py-2 rounded-lg"
        >
          <Download size={18} />
          Download
        </button>

        <button
          disabled={loading}
          onClick={onRegenerate}
          className="flex items-center gap-2 bg-purple-600 text-white px-5 py-2 rounded-lg"
        >
          <RefreshCw size={18} />

          {loading ? "Generating..." : "Regenerate"}
        </button>

      </div>

    </div>
  );
}
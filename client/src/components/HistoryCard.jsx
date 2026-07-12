import { Copy } from "lucide-react";
import toast from "react-hot-toast";

export default function HistoryCard({ email }) {

  const copy = async () => {
    await navigator.clipboard.writeText(email.emailBody);
    toast.success("Copied");
  };

  return (
    <div className="bg-white rounded-xl shadow p-6">

      <div className="flex justify-between items-start">

        <div>

          <h2 className="font-bold text-xl">
            {email.subject}
          </h2>

          <p className="text-gray-500 text-sm mt-1">
            {new Date(email.createdAt).toLocaleString()}
          </p>

        </div>

        <button
          onClick={copy}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          <Copy size={18} />
        </button>

      </div>

      <div className="mt-6">

        <p className="font-semibold">
          Prompt
        </p>

        <p className="text-gray-600">
          {email.prompt}
        </p>

      </div>

      <div className="mt-6 whitespace-pre-wrap leading-7 text-gray-700">

        {email.emailBody}

      </div>

    </div>
  );
}
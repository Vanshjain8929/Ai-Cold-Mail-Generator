import { Copy, Download, Mail, RefreshCw } from "lucide-react";
import toast from "react-hot-toast";

export default function EmailCard({
  title,
  content,
  loading,
  onRegenerate,
}) {
  const copyText = async () => {
    try {
      await navigator.clipboard.writeText(content);
      toast.success("Copied to clipboard");
    } catch {
      toast.error("Failed to copy");
    }
  };

  const downloadText = () => {
    const blob = new Blob([content], { type: "text/plain" });

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = `${title.replace(/\s+/g, "_")}.txt`;

    link.click();

    window.URL.revokeObjectURL(url);

    toast.success("Downloaded");
  };

  const getIcon = () => {
    switch (title) {
      case "Subject":
        return <Mail className="text-blue-600" size={22} />;

      case "LinkedIn DM":
        return <Mail className="text-blue-600" size={22} />;

      default:
        return <Mail className="text-blue-600" size={22} />;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">

      <div className="flex justify-between items-center border-b px-6 py-4">

        <div className="flex items-center gap-3">

          {getIcon()}

          <h2 className="font-bold text-lg">

            {title}

          </h2>

        </div>

        <div className="flex gap-2">

          <button
            onClick={copyText}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <Copy size={18} />
          </button>

          <button
            onClick={downloadText}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <Download size={18} />
          </button>

          {onRegenerate && (
            <button
              disabled={loading}
              onClick={onRegenerate}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              <RefreshCw
                size={18}
                className={loading ? "animate-spin" : ""}
              />
            </button>
          )}

        </div>

      </div>

      <div className="p-6">

        <pre className="whitespace-pre-wrap leading-8 text-gray-700 font-sans">

          {content}

        </pre>

      </div>

    </div>
  );
}
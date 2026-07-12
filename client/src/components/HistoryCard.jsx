import { Copy } from "lucide-react";
import toast from "react-hot-toast";

export default function HistoryCard({ email }) {

    const copy = () => {

        navigator.clipboard.writeText(email.emailBody);

        toast.success("Copied");

    };

    return (

        <div className="bg-white rounded-xl shadow p-6">

            <div className="flex justify-between">

                <div>

                    <h2 className="font-bold text-xl">
                        {email.subject}
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                        {new Date(email.createdAt).toLocaleString()}
                    </p>

                </div>

                <button
                    onClick={copy}
                    className="text-blue-600 hover:text-blue-700"
                >
                    <Copy />
                </button>

            </div>

            <p className="mt-5 whitespace-pre-wrap text-gray-700">
                {email.emailBody}
            </p>

        </div>

    );

}
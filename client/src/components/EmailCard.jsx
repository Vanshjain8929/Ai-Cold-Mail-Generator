import { Copy } from "lucide-react";
import toast from "react-hot-toast";

export default function EmailCard({

    title,
    content,

}) {

    const copy = () => {

        navigator.clipboard.writeText(content);

        toast.success("Copied");

    };

    return (

        <div className="bg-white rounded-xl shadow p-6">

            <div className="flex justify-between mb-4">

                <h2 className="font-bold text-lg">

                    {title}

                </h2>

                <button
                    onClick={copy}
                    className="flex gap-2 items-center text-blue-600 hover:text-blue-700"
                >

                    <Copy size={18} />

                    Copy

                </button>

            </div>

            <div className="whitespace-pre-wrap leading-7 text-gray-700">

                {content}

            </div>

        </div>

    );

}
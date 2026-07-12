export default function Button({
    children,
    loading,
    onClick,
}) {

    return (

        <button
            type="button"
            onClick={onClick}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg disabled:opacity-60"
        >

            {loading ? "Generating..." : children}

        </button>

    );

}
export default function PromptInput({
    value,
    onChange,
}) {

    return (

        <div>

            <label className="font-semibold">

                Prompt

            </label>

            <textarea
                rows={7}
                value={value}
                onChange={onChange}
                maxLength={2000}
                placeholder="Describe the email you want AI to generate..."
                className="mt-2 w-full border rounded-xl p-4 resize-none outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="flex justify-end mt-2">

                <span className="text-gray-500 text-sm">

                    {value.length}/2000

                </span>

            </div>

        </div>

    );

}
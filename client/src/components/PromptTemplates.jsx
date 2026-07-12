const templates = [
  {
    title: "Recruiter",
    prompt:
      "Write a cold email to a recruiter for a Software Engineer position.",
  },
  {
    title: "Startup",
    prompt:
      "Write a cold email to the founder of a startup offering my AI solution.",
  },
  {
    title: "Internship",
    prompt:
      "Write a cold email asking for a software engineering internship.",
  },
  {
    title: "SaaS",
    prompt:
      "Write a cold email pitching a SaaS product to a CTO.",
  },
];

export default function PromptTemplates({ setPrompt }) {
  return (
    <div>

      <h3 className="font-semibold mb-3">
        Quick Templates
      </h3>

      <div className="flex flex-wrap gap-3">

        {templates.map((item) => (

          <button
            key={item.title}
            onClick={() => setPrompt(item.prompt)}
            className="px-4 py-2 rounded-full bg-blue-100 text-blue-700 hover:bg-blue-600 hover:text-white transition"
          >
            {item.title}
          </button>

        ))}

      </div>

    </div>
  );
}
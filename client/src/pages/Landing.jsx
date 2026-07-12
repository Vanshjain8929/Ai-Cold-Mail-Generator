import { Link } from "react-router-dom";
import {
  ArrowRight,
  Sparkles,
  Mail,
  MessageSquare,
  History,
  Bot
} from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Navbar */}

      <nav className="max-w-7xl mx-auto flex justify-between items-center py-6 px-8">

        <h1 className="text-2xl font-bold text-blue-500">
          AI Cold Mail
        </h1>

        <div className="flex gap-4">

          <Link
            to="/login"
            className="px-5 py-2 rounded-lg hover:bg-slate-800"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg"
          >
            Get Started
          </Link>

        </div>

      </nav>

      {/* Hero */}

      <section className="max-w-7xl mx-auto px-8 py-20 grid lg:grid-cols-2 gap-16 items-center">

        <div>

          <div className="inline-flex items-center gap-2 bg-blue-900/40 text-blue-300 px-4 py-2 rounded-full mb-8">

            <Sparkles size={18} />

            AI Powered Outreach

          </div>

          <h1 className="text-6xl font-black leading-tight">

            Generate
            <span className="text-blue-500"> Professional </span>
            Cold Emails in Seconds

          </h1>

          <p className="text-slate-400 text-xl mt-8 leading-8">

            Create recruiter emails,
            LinkedIn messages,
            and follow-up emails instantly using AI.

          </p>

          <div className="flex gap-5 mt-10">

            <Link
              to="/signup"
              className="bg-blue-600 hover:bg-blue-700 px-7 py-4 rounded-xl flex items-center gap-2 font-semibold"
            >

              Start Free

              <ArrowRight size={20} />

            </Link>

            <Link
              to="/login"
              className="border border-slate-700 hover:bg-slate-900 px-7 py-4 rounded-xl"
            >

              Login

            </Link>

          </div>

        </div>

        {/* Right Side */}

        <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800 shadow-2xl">

          <div className="flex justify-between items-center">

            <h2 className="font-bold text-xl">

              AI Generated Email

            </h2>

            <Bot className="text-blue-500" />

          </div>

          <div className="mt-8 space-y-6">

            <div>

              <p className="text-sm text-slate-500">
                Subject
              </p>

              <p className="mt-2 font-semibold">

                Backend Engineer with AI Experience

              </p>

            </div>

            <div>

              <p className="text-sm text-slate-500">

                Email

              </p>

              <div className="bg-slate-800 rounded-xl p-5 mt-3 text-slate-300 leading-8">

                Hi Hiring Team,

                <br /><br />

                I noticed you're hiring backend engineers.

                I have experience building scalable MERN applications,
                authentication systems,
                AI integrations and REST APIs.

                I'd love to discuss how I could contribute.

                <br /><br />

                Regards,

                Vansh Jain

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* Features */}

      <section className="max-w-7xl mx-auto py-20 px-8">

        <h2 className="text-4xl font-bold text-center">

          Everything You Need

        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-14">

          <FeatureCard
            icon={<Mail size={32} />}
            title="Cold Emails"
            text="Generate professional cold emails instantly."
          />

          <FeatureCard
            icon={<MessageSquare size={32} />}
            title="LinkedIn DM"
            text="Create personalized LinkedIn messages."
          />

          <FeatureCard
            icon={<History size={32} />}
            title="History"
            text="Access every email you've generated."
          />

          <FeatureCard
            icon={<Bot size={32} />}
            title="AI Powered"
            text="Powered using Llama 3.3 via Groq."
          />

        </div>

      </section>

      {/* How it Works */}

      <section className="bg-slate-900 py-20">

        <div className="max-w-6xl mx-auto px-8">

          <h2 className="text-4xl font-bold text-center">

            How It Works

          </h2>

          <div className="grid md:grid-cols-3 gap-10 mt-14">

            <Step
              number="1"
              title="Describe"
              text="Describe your job role or company."
            />

            <Step
              number="2"
              title="Generate"
              text="AI creates emails instantly."
            />

            <Step
              number="3"
              title="Send"
              text="Copy, download and send."
            />

          </div>

        </div>

      </section>

      {/* CTA */}

      <section className="py-24">

        <div className="max-w-4xl mx-auto text-center">

          <h2 className="text-5xl font-bold">

            Ready to Generate Better Cold Emails?

          </h2>

          <p className="text-slate-400 mt-6 text-xl">

            Join thousands of developers using AI to improve outreach.

          </p>

          <Link
            to="/signup"
            className="inline-flex mt-10 bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl font-semibold"
          >

            Start For Free

          </Link>

        </div>

      </section>

      {/* Footer */}

      <footer className="border-t border-slate-800 py-8 text-center text-slate-500">

        © 2026 AI Cold Mail Generator • Built by Vansh Jain

      </footer>

    </div>
  );
}

function FeatureCard({ icon, title, text }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 hover:border-blue-500 transition">

      <div className="text-blue-500">

        {icon}

      </div>

      <h3 className="font-bold text-xl mt-5">

        {title}

      </h3>

      <p className="text-slate-400 mt-4">

        {text}

      </p>

    </div>
  );
}

function Step({ number, title, text }) {
  return (
    <div className="bg-slate-950 rounded-2xl p-8 text-center">

      <div className="h-16 w-16 rounded-full bg-blue-600 mx-auto flex items-center justify-center text-2xl font-bold">

        {number}

      </div>

      <h3 className="text-2xl font-bold mt-6">

        {title}

      </h3>

      <p className="text-slate-400 mt-4">

        {text}

      </p>

    </div>
  );
}
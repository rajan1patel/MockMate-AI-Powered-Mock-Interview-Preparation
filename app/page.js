"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { BarChart3, FileText, Mic, Sparkles } from "lucide-react";

export default function HomePage() {
  const { user } = useUser();
  const router = useRouter();

  return (
    <main className="flex flex-col min-h-screen">
      {/* NAVBAR */}
      <header className="w-full flex justify-between items-center px-8 py-4 bg-white shadow-lg z-50 fixed top-0 backdrop-blur-sm bg-white transition-colors duration-300 hover:bg-white">
        <div
          className="text-xl font-extrabold text-yellow-600 cursor-pointer select-none drop-shadow-md hover:text-yellow-700 transition-colors duration-300"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          role="button"
          tabIndex={0}
          aria-label="Go to top"
        >
          🤖 MockMate
        </div>
        <nav className="flex gap-8 items-center">
          <button
            onClick={() =>
              document
                .getElementById("about-section")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="text-gray-700 font-medium hover:text-yellow-600 transition-colors duration-300 cursor-pointer"
          >
        
  AboutUS
          </button>
          <Button
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
            onClick={() => router.push(user ? "/dashboard" : "/sign-in")}
          >
           {user ? "Dashboard" : "LOGIN"}
          </Button>
        </nav>
      </header>

      {/* HERO SECTION */}
      <section className="flex-1 pt-24 pb-16 relative text-white bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 overflow-hidden">
        <div
          className="absolute inset-0 opacity-15 bg-cover bg-center animate-fade-in"
          style={{ backgroundImage: `url('/carousel-1.jpg')` }}
        ></div>

        {/* Glowing blurred circle */}
        <div
          aria-hidden="true"
          className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-yellow-300 opacity-30 blur-3xl animate-pulse"
        ></div>

        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 py-32">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight drop-shadow-xl">
            Practice Smart.{" "}
            <span className="text-yellow-300 underline decoration-yellow-400 decoration-4 underline-offset-8">
              Interview Better.
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-6 text-white/90 drop-shadow-md">
            AI-generated interviews tailored to your job role, experience, and
            goals. Record, review, and get feedback instantly.
          </p>
          <Button
            onClick={() => router.push(user ? "/dashboard" : "/sign-in")}
            className="bg-white text-yellow-600 font-semibold px-8 py-4 rounded-full shadow-2xl hover:shadow-[0_10px_25px_rgba(250,204,21,0.6)] hover:bg-yellow-50 transition duration-300 ease-in-out transform hover:-translate-y-1 cursor-pointer"
          >
           {user ? "Go to Dashboard" : "Get Started"}
          </Button>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about-section" className="w-full bg-white py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <Image
            src="/tech1.jpg"
            alt="AI Interview Mock"
            width={500}
            height={400}
            className="rounded-xl shadow-lg"
          />
          <div className="space-y-5">
            <h2 className="text-3xl font-bold text-gray-800">
              Built for Interview Success
            </h2>
            <p className="text-gray-600 text-lg">
              MockMate generates 5 interview questions tailored to your job
              title, description, and experience. Use your camera and mic to
              simulate real interviews and receive actionable AI feedback on
              your responses.
            </p>
            <ul className="list-disc list-inside text-gray-700">
              <li>AI-curated interview questions</li>
              <li>Real-time video/audio practice</li>
              <li>Automated feedback & performance tracking</li>
            </ul>
          </div>

          <div className="space-y-5">
            <h2 className="text-3xl font-bold text-gray-800">
              Your AI Interview Coach
            </h2>
            <p className="text-gray-600 text-lg">
              Whether you're preparing for your first job or your dream role,
              our platform helps you refine answers, boost confidence, and
              review past performances to improve over time.
            </p>
            <ul className="list-disc list-inside text-gray-700">
              <li>Custom feedback on delivery & clarity</li>
              <li>Unlimited mock sessions</li>
              <li>Progress tracking dashboard</li>
            </ul>
          </div>
          <Image
            src="/tech2.jpg"
            alt="Interview Practice"
            width={500}
            height={400}
            className="rounded-xl shadow-lg"
          />
        </div>
      </section>

      {/* NEW SECTION: HOW IT WORKS */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-12">
            How It Works
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="bg-white shadow-md rounded-xl p-6">
              <h3 className="text-xl font-semibold text-yellow-600 mb-2">
                1. Select Job
              </h3>
              <p className="text-gray-600">
                Enter job position, description, and experience to generate a
                tailored interview.
              </p>
            </div>
            <div className="bg-white shadow-md rounded-xl p-6">
              <h3 className="text-xl font-semibold text-yellow-600 mb-2">
                2. Start Interview
              </h3>
              <p className="text-gray-600">
                Answer 5 AI-generated questions using your webcam and mic like a
                real interview.
              </p>
            </div>
            <div className="bg-white shadow-md rounded-xl p-6">
              <h3 className="text-xl font-semibold text-yellow-600 mb-2">
                3. Get Feedback
              </h3>
              <p className="text-gray-600">
                Receive instant AI feedback on your tone, clarity, and response
                structure.
              </p>
            </div>
            <div className="bg-white shadow-md rounded-xl p-6">
              <h3 className="text-xl font-semibold text-yellow-600 mb-2">
                4. Track & Improve
              </h3>
              <p className="text-gray-600">
                Review past interviews, track progress, and refine your
                performance over time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="bg-gray-50 py-20 px-6 border-t">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-10">
            How It Works
          </h2>
          <div className="grid md:grid-cols-4 gap-10 text-left">
            <div className="bg-white rounded-2xl p-6 shadow hover:shadow-md transition-all">
              <div className="text-yellow-500 mb-4">
                <FileText size={32} />
              </div>
              <h3 className="font-semibold text-lg text-gray-800 mb-2">
                Enter Job Details
              </h3>
              <p className="text-gray-600 text-sm">
                Input job title, description, and years of experience to get
                personalized interview questions.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow hover:shadow-md transition-all">
              <div className="text-yellow-500 mb-4">
                <Mic size={32} />
              </div>
              <h3 className="font-semibold text-lg text-gray-800 mb-2">
                Record Answers
              </h3>
              <p className="text-gray-600 text-sm">
                Turn on your mic and camera to simulate real interviews and
                record your responses.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow hover:shadow-md transition-all">
              <div className="text-yellow-500 mb-4">
                <Sparkles size={32} />
              </div>
              <h3 className="font-semibold text-lg text-gray-800 mb-2">
                Get Smart Feedback
              </h3>
              <p className="text-gray-600 text-sm">
                Receive AI-generated feedback on your responses, tone, clarity,
                and confidence.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow hover:shadow-md transition-all">
              <div className="text-yellow-500 mb-4">
                <BarChart3 size={32} />
              </div>
              <h3 className="font-semibold text-lg text-gray-800 mb-2">
                Track Your Progress
              </h3>
              <p className="text-gray-600 text-sm">
                Access a detailed dashboard of all past interviews,
                improvements, and scores over time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="bg-yellow-500 text-black py-16 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl font-bold">
            Ready to boost your confidence?
          </h2>
          <p className="text-lg">
            Start your first mock interview today and take a step closer to your
            dream job.
          </p>
          <Button
            onClick={() => router.push(user ? "/dashboard" : "/sign-in")}
            className="bg-black text-white px-6 py-3 hover:bg-gray-800 font-semibold"
          >
            Start Now
          </Button>
        </div>
      </section>
    </main>
  );
}

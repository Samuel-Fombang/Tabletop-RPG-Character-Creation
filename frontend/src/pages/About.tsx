import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";

type FeatureCardProps = {
  icon: string;
  title: string;
  description: string;
};

type TechnologyCardProps = {
  icon: string;
  title: string;
  technologies: string;
  status: string;
};

function FeatureCard({
  icon,
  title,
  description,
}: FeatureCardProps) {
  return (
    <article className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-purple-200 hover:shadow-lg">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-2xl transition group-hover:scale-110">
        {icon}
      </div>

      <h3 className="mt-5 text-lg font-bold text-slate-900">
        {title}
      </h3>

      <p className="mt-2 leading-7 text-slate-600">
        {description}
      </p>
    </article>
  );
}

function TechnologyCard({
  icon,
  title,
  technologies,
  status,
}: TechnologyCardProps) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-2xl">
          {icon}
        </div>

        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
          {status}
        </span>
      </div>

      <h3 className="mt-5 text-xl font-bold text-slate-900">
        {title}
      </h3>

      <p className="mt-2 leading-7 text-slate-600">
        {technologies}
      </p>
    </article>
  );
}

function About() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-100">
        <section className="bg-gradient-to-r from-slate-950 via-indigo-950 to-purple-950 px-4 py-16 text-white sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-300">
                  Tabletop RPG Project
                </p>

                <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl">
                  Build, manage and explore your RPG characters
                </h1>

                <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
                  The Tabletop RPG Character Creator is a web
                  application that helps players create, view,
                  edit and organise role-playing game
                  characters in one central place.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={() =>
                      navigate("/dashboard")
                    }
                    className="rounded-xl bg-amber-400 px-6 py-3 font-bold text-slate-950 shadow-lg transition hover:-translate-y-0.5 hover:bg-amber-300 focus:outline-none focus:ring-4 focus:ring-amber-300/40"
                  >
                    View Dashboard
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      navigate(
                        "/character/create",
                      )
                    }
                    className="rounded-xl border border-slate-500 bg-slate-900/50 px-6 py-3 font-semibold text-white transition hover:border-purple-300 hover:bg-purple-800/40 focus:outline-none focus:ring-4 focus:ring-purple-300/30"
                  >
                    Create Character
                  </button>
                </div>
              </div>

              <div className="rounded-3xl border border-purple-400/30 bg-white/10 p-6 shadow-2xl backdrop-blur">
                <div className="flex items-center gap-4">
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl border-2 border-amber-400 bg-slate-900 text-4xl shadow-xl">
                    ⚔️
                  </div>

                  <div>
                    <p className="text-sm font-semibold uppercase tracking-widest text-purple-200">
                      Project Goal
                    </p>

                    <h2 className="mt-1 text-2xl font-bold">
                      Digital character management
                    </h2>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="rounded-2xl bg-slate-900/60 p-4">
                    <p className="text-2xl font-bold text-amber-300">
                      4
                    </p>

                    <p className="mt-1 text-sm text-slate-300">
                      Main features
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-900/60 p-4">
                    <p className="text-2xl font-bold text-purple-300">
                      3
                    </p>

                    <p className="mt-1 text-sm text-slate-300">
                      Technologies
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-900/60 p-4">
                    <p className="text-2xl font-bold text-green-300">
                      React
                    </p>

                    <p className="mt-1 text-sm text-slate-300">
                      Frontend
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-900/60 p-4">
                    <p className="text-2xl font-bold text-blue-300">
                      C#
                    </p>

                    <p className="mt-1 text-sm text-slate-300">
                      Backend
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-widest text-purple-700">
                Project Overview
              </p>

              <h2 className="mt-2 text-3xl font-bold text-slate-900">
                A better way to manage RPG characters
              </h2>

              <p className="mt-4 leading-8 text-slate-600">
                Instead of using paper sheets, players can
                create their characters digitally, assign
                attributes, calculate derived statistics and
                manage saved characters from one organised
                dashboard.
              </p>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2">
              <FeatureCard
                icon="👤"
                title="Account Management"
                description="Users can create an account, sign in, view their profile and securely sign out of the application."
              />

              <FeatureCard
                icon="🧙"
                title="Character Creation"
                description="Players can enter character information, choose a race, select a level and assign physical and mental statistics."
              />

              <FeatureCard
                icon="📊"
                title="Character Dashboard"
                description="Saved characters are displayed in one organised dashboard with summary statistics and quick access to character details."
              />

              <FeatureCard
                icon="⚙️"
                title="Character Management"
                description="Users can view, edit, update and delete characters while keeping each character connected to its owner."
              />
            </div>
          </div>
        </section>

        <section className="bg-white px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-widest text-indigo-700">
                Technology Stack
              </p>

              <h2 className="mt-2 text-3xl font-bold text-slate-900">
                Built with modern web technologies
              </h2>

              <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-600">
                The application is divided into frontend,
                backend and database layers so each part can
                be developed and maintained independently.
              </p>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              <TechnologyCard
                icon="⚛️"
                title="Frontend"
                technologies="React, TypeScript, React Router and Tailwind CSS"
                status="Active"
              />

              <TechnologyCard
                icon="🧩"
                title="Backend"
                technologies="C# and ASP.NET Core Web API"
                status="In progress"
              />

              <TechnologyCard
                icon="🗄️"
                title="Database"
                technologies="MongoDB for persistent account and character data"
                status="Planned"
              />
            </div>
          </div>
        </section>

        <section className="px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg">
              <div className="grid lg:grid-cols-[0.8fr_1.2fr]">
                <div className="bg-gradient-to-br from-purple-800 to-indigo-950 p-8 text-white sm:p-10">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-3xl">
                    💾
                  </div>

                  <p className="mt-6 text-sm font-semibold uppercase tracking-widest text-purple-200">
                    Development Mode
                  </p>

                  <h2 className="mt-2 text-3xl font-bold">
                    Current data storage
                  </h2>
                </div>

                <div className="p-8 sm:p-10">
                  <p className="leading-8 text-slate-600">
                    The frontend currently uses local storage
                    for temporary account and character data.
                    This allows the frontend features to be
                    developed and tested while the C# backend
                    and MongoDB integration are still being
                    completed.
                  </p>

                  <div className="mt-6 rounded-2xl border border-blue-200 bg-blue-50 p-5">
                    <h3 className="font-bold text-blue-900">
                      Next development step
                    </h3>

                    <p className="mt-2 leading-7 text-blue-800">
                      The local storage service will later be
                      replaced with API requests to the
                      ASP.NET Core backend, while the current
                      user interface remains the same.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 pb-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl rounded-3xl bg-slate-900 px-6 py-10 text-center text-white shadow-xl sm:px-10">
            <p className="text-sm font-semibold uppercase tracking-widest text-amber-300">
              Begin Your Adventure
            </p>

            <h2 className="mt-3 text-3xl font-bold">
              Create your next RPG character
            </h2>

            <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-300">
              Build a new character, assign attributes and
              view the calculated combat statistics
              immediately.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() =>
                  navigate(
                    "/character/create",
                  )
                }
                className="rounded-xl bg-purple-600 px-7 py-3 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-300/40"
              >
                Create New Character
              </button>

              <button
                type="button"
                onClick={() =>
                  navigate("/dashboard")
                }
                className="rounded-xl border border-slate-600 px-7 py-3 font-semibold text-white transition hover:border-slate-400 hover:bg-slate-800"
              >
                Return to Dashboard
              </button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default About;
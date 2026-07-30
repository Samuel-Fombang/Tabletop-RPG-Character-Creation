import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";

function About() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-100 px-4 py-10">
        <section className="mx-auto max-w-4xl rounded-xl bg-white p-8 shadow-lg">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-slate-800">
              About the Project
            </h1>

            <p className="mt-3 text-gray-600">
              Learn more about the Tabletop RPG Character
              Creator.
            </p>
          </div>

          <div className="mt-10 space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-slate-800">
                Project Overview
              </h2>

              <p className="mt-3 leading-7 text-gray-700">
                The Tabletop RPG Character Creator is a web
                application that allows players to create,
                view, edit, and manage role-playing game
                characters in one place.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-800">
                Main Features
              </h2>

              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <article className="rounded-lg bg-slate-50 p-5">
                  <h3 className="font-bold text-slate-800">
                    Account Management
                  </h3>

                  <p className="mt-2 text-gray-600">
                    Users can create an account, sign in, view
                    their profile, and sign out.
                  </p>
                </article>

                <article className="rounded-lg bg-slate-50 p-5">
                  <h3 className="font-bold text-slate-800">
                    Character Creation
                  </h3>

                  <p className="mt-2 text-gray-600">
                    Players can enter character information,
                    select a race, and assign statistics.
                  </p>
                </article>

                <article className="rounded-lg bg-slate-50 p-5">
                  <h3 className="font-bold text-slate-800">
                    Character Dashboard
                  </h3>

                  <p className="mt-2 text-gray-600">
                    Saved characters are displayed in one
                    organised dashboard.
                  </p>
                </article>

                <article className="rounded-lg bg-slate-50 p-5">
                  <h3 className="font-bold text-slate-800">
                    Character Management
                  </h3>

                  <p className="mt-2 text-gray-600">
                    Users can view, edit, update, and delete
                    their characters.
                  </p>
                </article>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-800">
                Technologies
              </h2>

              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-lg border border-gray-200 p-4 text-center">
                  <h3 className="font-bold text-slate-800">
                    Frontend
                  </h3>

                  <p className="mt-2 text-gray-600">
                    React, TypeScript, React Router and Tailwind
                    CSS
                  </p>
                </div>

                <div className="rounded-lg border border-gray-200 p-4 text-center">
                  <h3 className="font-bold text-slate-800">
                    Backend
                  </h3>

                  <p className="mt-2 text-gray-600">
                    C# and ASP.NET Core Web API
                  </p>
                </div>

                <div className="rounded-lg border border-gray-200 p-4 text-center">
                  <h3 className="font-bold text-slate-800">
                    Database
                  </h3>

                  <p className="mt-2 text-gray-600">
                    MongoDB
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-800">
                Current Development Mode
              </h2>

              <p className="mt-3 leading-7 text-gray-700">
                The frontend currently uses local storage for
                temporary account and character data. The
                storage service is prepared so it can later be
                connected to the C# backend and MongoDB
                database.
              </p>
            </section>
          </div>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="rounded-md bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Go to Dashboard
            </button>

            <button
              type="button"
              onClick={() => navigate("/character/create")}
              className="rounded-md bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700"
            >
              Create Character
            </button>
          </div>
        </section>
      </main>
    </>
  );
}

export default About;
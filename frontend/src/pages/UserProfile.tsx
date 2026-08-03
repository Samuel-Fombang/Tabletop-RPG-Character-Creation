import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";

type RegisteredUser = {
  username: string;
  email: string;
  name: string;
  birthday: string;
};

function UserProfile() {
  const navigate = useNavigate();

  const getSavedUser =
    (): RegisteredUser | null => {
      const savedUser =
        localStorage.getItem(
          "registeredUser",
        );

      if (!savedUser) {
        return null;
      }

      try {
        return JSON.parse(
          savedUser,
        ) as RegisteredUser;
      } catch (error) {
        console.error(
          "Unable to read saved user:",
          error,
        );

        return null;
      }
    };

  const user = getSavedUser();

  const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem(
      "registeredUser",
    );

    navigate("/login", {
      replace: true,
    });
  };

  const getInitials = (
    name: string,
  ) => {
    const initials = name
      .trim()
      .split(/\s+/)
      .map((part) => part.charAt(0))
      .join("")
      .slice(0, 2)
      .toUpperCase();

    return initials || "?";
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-100 px-4 py-8 sm:px-6 lg:px-8">
        <section className="mx-auto max-w-5xl">
          {user ? (
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
              <header className="bg-gradient-to-r from-slate-950 via-indigo-950 to-purple-950 px-6 py-8 text-white sm:px-8">
                <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                    <div className="flex h-24 w-24 items-center justify-center rounded-2xl border-2 border-amber-400 bg-slate-800 text-3xl font-bold text-amber-300 shadow-xl">
                      {getInitials(
                        user.name ||
                          user.username,
                      )}
                    </div>

                    <div>
                      <p className="text-sm font-semibold uppercase tracking-widest text-purple-200">
                        User Profile
                      </p>

                      <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
                        {user.name ||
                          user.username}
                      </h1>

                      <p className="mt-2 text-slate-300">
                        Manage your account and
                        access your RPG
                        characters.
                      </p>
                    </div>
                  </div>

                  <span className="w-fit rounded-full bg-green-400 px-4 py-2 text-sm font-bold text-green-950">
                    Active Account
                  </span>
                </div>
              </header>

              <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.2fr_0.8fr]">
                <section className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-widest text-purple-700">
                      Personal Information
                    </p>

                    <h2 className="mt-2 text-2xl font-bold text-slate-900">
                      Account Details
                    </h2>

                    <p className="mt-2 text-slate-600">
                      These details are stored
                      locally while the backend
                      account system is being
                      completed.
                    </p>
                  </div>

                  <div className="mt-8 grid gap-5 sm:grid-cols-2">
                    <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                      <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                        Username
                      </p>

                      <p className="mt-2 break-words text-lg font-bold text-slate-900">
                        {user.username}
                      </p>
                    </article>

                    <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                      <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                        Full Name
                      </p>

                      <p className="mt-2 break-words text-lg font-bold text-slate-900">
                        {user.name}
                      </p>
                    </article>

                    <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                      <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                        Email Address
                      </p>

                      <p className="mt-2 break-all text-lg font-bold text-slate-900">
                        {user.email}
                      </p>
                    </article>

                    <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                      <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                        Birthday
                      </p>

                      <p className="mt-2 text-lg font-bold text-slate-900">
                        {user.birthday ||
                          "Not provided"}
                      </p>
                    </article>
                  </div>
                </section>

                <aside className="space-y-6">
                  <section className="rounded-2xl bg-slate-900 p-6 text-white shadow-lg">
                    <p className="text-sm font-semibold uppercase tracking-widest text-amber-300">
                      Quick Actions
                    </p>

                    <h2 className="mt-2 text-2xl font-bold">
                      Continue Your Adventure
                    </h2>

                    <p className="mt-3 leading-7 text-slate-300">
                      Open your character
                      dashboard or begin
                      creating a new hero.
                    </p>

                    <div className="mt-6 space-y-3">
                      <button
                        type="button"
                        onClick={() =>
                          navigate(
                            "/dashboard",
                          )
                        }
                        className="w-full rounded-xl bg-purple-600 px-5 py-3 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-300/30"
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
                        className="w-full rounded-xl bg-amber-400 px-5 py-3 font-bold text-slate-950 transition hover:-translate-y-0.5 hover:bg-amber-300 focus:outline-none focus:ring-4 focus:ring-amber-300/30"
                      >
                        Create Character
                      </button>
                    </div>
                  </section>

                  <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <p className="text-sm font-semibold uppercase tracking-widest text-red-600">
                      Account Session
                    </p>

                    <h2 className="mt-2 text-xl font-bold text-slate-900">
                      Sign Out
                    </h2>

                    <p className="mt-3 text-sm leading-6 text-slate-600">
                      Logging out will remove
                      the current local session
                      from this browser.
                    </p>

                    <button
                      type="button"
                      onClick={logoutUser}
                      className="mt-6 w-full rounded-xl border border-red-200 bg-red-50 px-5 py-3 font-semibold text-red-700 transition hover:bg-red-600 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-200"
                    >
                      Logout
                    </button>
                  </section>
                </aside>
              </div>
            </div>
          ) : (
            <div className="mx-auto max-w-lg overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
              <header className="bg-gradient-to-r from-slate-950 via-indigo-950 to-purple-950 px-6 py-8 text-center text-white">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl border-2 border-amber-400 bg-slate-800 text-4xl">
                  👤
                </div>

                <h1 className="mt-5 text-3xl font-bold">
                  No User Found
                </h1>

                <p className="mt-2 text-slate-300">
                  No saved account information
                  is available.
                </p>
              </header>

              <div className="p-6 text-center sm:p-8">
                <p className="leading-7 text-slate-600">
                  Please create an account or
                  sign in before accessing the
                  profile page.
                </p>

                <div className="mt-6 space-y-3">
                  <button
                    type="button"
                    onClick={() =>
                      navigate("/signup")
                    }
                    className="w-full rounded-xl bg-purple-700 px-5 py-3 font-semibold text-white transition hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-200"
                  >
                    Create Account
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      navigate("/login")
                    }
                    className="w-full rounded-xl bg-slate-700 px-5 py-3 font-semibold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-200"
                  >
                    Go to Login
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>
      </main>
    </>
  );
}

export default UserProfile;
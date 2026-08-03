import {
  useState,
  type KeyboardEvent,
} from "react";

import { useNavigate } from "react-router-dom";

import FormInput from "../components/FormInput";

type RegisteredUser = {
  username: string;
  email: string;
  password: string;
};

function Login() {
  const navigate = useNavigate();

  const [loginName, setLoginName] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [message, setMessage] =
    useState("");

  const [isLoggingIn, setIsLoggingIn] =
    useState(false);

  const loginUser = () => {
    setMessage("");

    if (loginName.trim() === "") {
      setMessage(
        "Please enter your username or email.",
      );

      return;
    }

    if (password === "") {
      setMessage(
        "Please enter your password.",
      );

      return;
    }

    const savedUser =
      localStorage.getItem(
        "registeredUser",
      );

    if (!savedUser) {
      setMessage(
        "No account was found. Please create an account.",
      );

      return;
    }

    setIsLoggingIn(true);

    try {
      const user: RegisteredUser =
        JSON.parse(savedUser);

      const enteredLogin =
        loginName
          .trim()
          .toLowerCase();

      const usernameMatches =
        user.username
          .toLowerCase() ===
        enteredLogin;

      const emailMatches =
        user.email
          .toLowerCase() ===
        enteredLogin;

      const passwordMatches =
        user.password === password;

      if (
        (usernameMatches ||
          emailMatches) &&
        passwordMatches
      ) {
        localStorage.setItem(
          "token",
          "temporary-frontend-token",
        );

        navigate("/dashboard", {
          replace: true,
        });

        return;
      }

      setMessage(
        "Username, email, or password is incorrect.",
      );
    } catch (error) {
      console.error(
        "Login error:",
        error,
      );

      setMessage(
        "Could not read the saved account.",
      );
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleKeyDown = (
    event: KeyboardEvent<HTMLDivElement>,
  ) => {
    if (
      event.key === "Enter" &&
      !isLoggingIn
    ) {
      loginUser();
    }
  };

  return (
    <main className="min-h-screen bg-slate-950">
      <div className="grid min-h-screen lg:grid-cols-2">
        <section className="hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 px-12 py-16 text-white lg:flex lg:flex-col lg:justify-between">
          <div>
            <button
              type="button"
              onClick={() =>
                navigate("/login")
              }
              className="flex items-center gap-4 text-left"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-purple-400 bg-slate-900 text-3xl shadow-xl">
                ⚔️
              </span>

              <div>
                <p className="text-2xl font-bold">
                  Tabletop RPG
                </p>

                <p className="text-sm text-slate-400">
                  Character Creator
                </p>
              </div>
            </button>

            <div className="mt-24 max-w-xl">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-300">
                Begin Your Adventure
              </p>

              <h1 className="mt-5 text-5xl font-bold leading-tight">
                Build heroes.
                <br />
                Create stories.
                <br />
                Manage adventures.
              </h1>

              <p className="mt-6 max-w-lg text-lg leading-8 text-slate-300">
                Sign in to create and manage
                your tabletop RPG characters,
                calculate their statistics and
                continue their adventures.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <article className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
              <p className="text-3xl">
                🧙
              </p>

              <h2 className="mt-3 font-bold">
                Create
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Build unique characters.
              </p>
            </article>

            <article className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
              <p className="text-3xl">
                ⚔️
              </p>

              <h2 className="mt-3 font-bold">
                Manage
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Edit and organise heroes.
              </p>
            </article>

            <article className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
              <p className="text-3xl">
                📊
              </p>

              <h2 className="mt-3 font-bold">
                Explore
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Review calculated stats.
              </p>
            </article>
          </div>
        </section>

        <section className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-10 sm:px-6">
          <div className="w-full max-w-md">
            <div className="mb-8 flex items-center justify-center gap-3 lg:hidden">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-700 to-indigo-900 text-2xl text-white shadow-lg">
                ⚔️
              </span>

              <div>
                <p className="text-lg font-bold text-slate-900">
                  Tabletop RPG
                </p>

                <p className="text-xs text-slate-500">
                  Character Creator
                </p>
              </div>
            </div>

            <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
              <header className="bg-gradient-to-r from-slate-900 via-indigo-950 to-purple-950 px-6 py-8 text-center text-white sm:px-8">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-amber-400 bg-slate-800 text-3xl shadow-lg">
                  🔐
                </div>

                <h1 className="mt-5 text-3xl font-bold">
                  Welcome Back
                </h1>

                <p className="mt-2 text-slate-300">
                  Sign in to manage your RPG
                  characters.
                </p>
              </header>

              <div
                className="space-y-5 p-6 sm:p-8"
                onKeyDown={
                  handleKeyDown
                }
              >
                <FormInput
                  label="Username or Email"
                  id="loginName"
                  type="text"
                  value={loginName}
                  placeholder="Enter username or email"
                  required
                  onChange={(event) =>
                    setLoginName(
                      event.target.value,
                    )
                  }
                />

                <FormInput
                  label="Password"
                  id="password"
                  type="password"
                  value={password}
                  placeholder="Enter password"
                  required
                  onChange={(event) =>
                    setPassword(
                      event.target.value,
                    )
                  }
                />

                {message && (
                  <div
                    className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                    role="alert"
                  >
                    <span className="text-lg">
                      ⚠️
                    </span>

                    <span>{message}</span>
                  </div>
                )}

                <button
                  type="button"
                  onClick={loginUser}
                  disabled={
                    isLoggingIn
                  }
                  className="w-full rounded-xl bg-purple-700 px-5 py-3 font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-200 disabled:cursor-not-allowed disabled:bg-purple-300"
                >
                  {isLoggingIn
                    ? "Signing In..."
                    : "Sign In"}
                </button>

                <div className="flex items-center gap-3">
                  <div className="h-px flex-1 bg-slate-200" />

                  <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                    New Adventurer
                  </span>

                  <div className="h-px flex-1 bg-slate-200" />
                </div>

                <button
                  type="button"
                  onClick={() =>
                    navigate("/signup")
                  }
                  disabled={
                    isLoggingIn
                  }
                  className="w-full rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 transition hover:border-purple-400 hover:bg-purple-50 hover:text-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-100 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Create New Account
                </button>

                <p className="text-center text-xs leading-5 text-slate-500">
                  This frontend currently
                  stores account information
                  in your browser using local
                  storage.
                </p>
              </div>
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Login;
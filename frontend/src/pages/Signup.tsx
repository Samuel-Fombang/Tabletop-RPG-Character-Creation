import {
  useState,
  type KeyboardEvent,
} from "react";

import { useNavigate } from "react-router-dom";

import FormInput from "../components/FormInput";

function Signup() {
  const navigate = useNavigate();

  const [username, setUsername] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [name, setName] =
    useState("");

  const [birthday, setBirthday] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("");

  const [message, setMessage] =
    useState("");

  const [
    isRegistering,
    setIsRegistering,
  ] = useState(false);

  const registerUser = () => {
    setMessage("");

    if (
      !username.trim() ||
      !email.trim() ||
      !name.trim() ||
      !birthday ||
      !password ||
      !confirmPassword
    ) {
      setMessage(
        "Please complete all fields.",
      );

      return;
    }

    if (!email.includes("@")) {
      setMessage(
        "Please enter a valid email address.",
      );

      return;
    }

    if (password.length < 6) {
      setMessage(
        "Password must contain at least 6 characters.",
      );

      return;
    }

    if (
      password !==
      confirmPassword
    ) {
      setMessage(
        "The passwords do not match.",
      );

      return;
    }

    setIsRegistering(true);

    try {
      const newUser = {
        username:
          username.trim(),

        email: email
          .trim()
          .toLowerCase(),

        name: name.trim(),
        birthday,
        password,
      };

      localStorage.setItem(
        "registeredUser",
        JSON.stringify(newUser),
      );

      localStorage.setItem(
        "token",
        "temporary-frontend-token",
      );

      navigate("/profile", {
        replace: true,
      });
    } catch (error) {
      console.error(
        "Registration error:",
        error,
      );

      setMessage(
        "Could not create the account.",
      );
    } finally {
      setIsRegistering(false);
    }
  };

  const handleKeyDown = (
    event: KeyboardEvent<HTMLDivElement>,
  ) => {
    if (
      event.key === "Enter" &&
      !isRegistering
    ) {
      registerUser();
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

            <div className="mt-20 max-w-xl">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-300">
                Create Your Account
              </p>

              <h1 className="mt-5 text-5xl font-bold leading-tight">
                Your next adventure
                starts here.
              </h1>

              <p className="mt-6 max-w-lg text-lg leading-8 text-slate-300">
                Register your account,
                create unique heroes and
                manage your tabletop RPG
                characters from one
                professional dashboard.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <article className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
              <p className="text-3xl">
                👤
              </p>

              <h2 className="mt-3 font-bold">
                Register
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Create your profile.
              </p>
            </article>

            <article className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
              <p className="text-3xl">
                🧙
              </p>

              <h2 className="mt-3 font-bold">
                Build
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Create unique heroes.
              </p>
            </article>

            <article className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
              <p className="text-3xl">
                📖
              </p>

              <h2 className="mt-3 font-bold">
                Explore
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Continue your story.
              </p>
            </article>
          </div>
        </section>

        <section className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-10 sm:px-6">
          <div className="w-full max-w-xl">
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
                  🧙
                </div>

                <h1 className="mt-5 text-3xl font-bold">
                  Create Account
                </h1>

                <p className="mt-2 text-slate-300">
                  Register to create and
                  manage your RPG
                  characters.
                </p>
              </header>

              <div
                className="space-y-5 p-6 sm:p-8"
                onKeyDown={
                  handleKeyDown
                }
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <FormInput
                    label="Username"
                    id="username"
                    type="text"
                    value={username}
                    placeholder="Enter username"
                    required
                    onChange={(event) =>
                      setUsername(
                        event.target.value,
                      )
                    }
                  />

                  <FormInput
                    label="Full Name"
                    id="name"
                    type="text"
                    value={name}
                    placeholder="Enter full name"
                    required
                    onChange={(event) =>
                      setName(
                        event.target.value,
                      )
                    }
                  />
                </div>

                <FormInput
                  label="Email Address"
                  id="email"
                  type="email"
                  value={email}
                  placeholder="Enter your email"
                  required
                  onChange={(event) =>
                    setEmail(
                      event.target.value,
                    )
                  }
                />

                <FormInput
                  label="Birthday"
                  id="birthday"
                  type="date"
                  value={birthday}
                  required
                  onChange={(event) =>
                    setBirthday(
                      event.target.value,
                    )
                  }
                />

                <div className="grid gap-5 sm:grid-cols-2">
                  <FormInput
                    label="Password"
                    id="password"
                    type="password"
                    value={password}
                    placeholder="At least 6 characters"
                    required
                    onChange={(event) =>
                      setPassword(
                        event.target.value,
                      )
                    }
                  />

                  <FormInput
                    label="Confirm Password"
                    id="confirmPassword"
                    type="password"
                    value={
                      confirmPassword
                    }
                    placeholder="Repeat password"
                    required
                    onChange={(event) =>
                      setConfirmPassword(
                        event.target.value,
                      )
                    }
                  />
                </div>

                <div className="rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm leading-6 text-blue-800">
                  Your password must contain
                  at least six characters.
                </div>

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
                  onClick={
                    registerUser
                  }
                  disabled={
                    isRegistering
                  }
                  className="w-full rounded-xl bg-purple-700 px-5 py-3 font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-200 disabled:cursor-not-allowed disabled:bg-purple-300"
                >
                  {isRegistering
                    ? "Creating Account..."
                    : "Create Account"}
                </button>

                <div className="flex items-center gap-3">
                  <div className="h-px flex-1 bg-slate-200" />

                  <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                    Already Registered
                  </span>

                  <div className="h-px flex-1 bg-slate-200" />
                </div>

                <button
                  type="button"
                  onClick={() =>
                    navigate("/login")
                  }
                  disabled={
                    isRegistering
                  }
                  className="w-full rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 transition hover:border-purple-400 hover:bg-purple-50 hover:text-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-100 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Back to Login
                </button>

                <p className="text-center text-xs leading-5 text-slate-500">
                  Account information is
                  currently stored locally in
                  this browser until backend
                  authentication is connected.
                </p>
              </div>
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Signup;
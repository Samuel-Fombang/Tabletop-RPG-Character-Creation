import { useState } from "react";
import { useNavigate } from "react-router-dom";

import FormInput from "../components/FormInput";

type RegisteredUser = {
  username: string;
  email: string;
  password: string;
};

function Login() {
  const navigate = useNavigate();

  const [loginName, setLoginName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const loginUser = () => {
    setMessage("");

    if (loginName.trim() === "") {
      setMessage(
        "Please enter your username or email.",
      );
      return;
    }

    if (password === "") {
      setMessage("Please enter your password.");
      return;
    }

    const savedUser =
      localStorage.getItem("registeredUser");

    if (!savedUser) {
      setMessage(
        "No account was found. Please create an account.",
      );
      return;
    }

    try {
      const user: RegisteredUser =
        JSON.parse(savedUser);

      const enteredLogin =
        loginName.trim().toLowerCase();

      const usernameMatches =
        user.username.toLowerCase() ===
        enteredLogin;

      const emailMatches =
        user.email.toLowerCase() ===
        enteredLogin;

      const passwordMatches =
        user.password === password;

      if (
        (usernameMatches || emailMatches) &&
        passwordMatches
      ) {
        localStorage.setItem(
          "token",
          "temporary-frontend-token",
        );

        navigate("/dashboard");
        return;
      }

      setMessage(
        "Username, email, or password is incorrect.",
      );
    } catch (error) {
      console.error("Login error:", error);

      setMessage(
        "Could not read the saved account.",
      );
    }
  };

  const handleKeyDown = (
    event: React.KeyboardEvent,
  ) => {
    if (event.key === "Enter") {
      loginUser();
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 p-6">
      <section className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <h1 className="text-center text-3xl font-bold text-gray-800">
          Login
        </h1>

        <p className="mt-2 text-center text-gray-500">
          Sign in to manage your RPG
          characters.
        </p>

        <div
          className="mt-6 space-y-4"
          onKeyDown={handleKeyDown}
        >
          <FormInput
            label="Username or Email"
            id="loginName"
            type="text"
            value={loginName}
            placeholder="Enter username or email"
            required
            onChange={(event) =>
              setLoginName(event.target.value)
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
              setPassword(event.target.value)
            }
          />

          {message && (
            <p
              className="rounded-md bg-red-50 px-4 py-3 text-sm text-red-700"
              role="alert"
            >
              {message}
            </p>
          )}

          <button
            type="button"
            onClick={loginUser}
            className="w-full rounded-md bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Login
          </button>

          <button
            type="button"
            onClick={() =>
              navigate("/signup")
            }
            className="w-full rounded-md bg-green-600 py-3 font-semibold text-white transition hover:bg-green-700"
          >
            Create New Account
          </button>
        </div>
      </section>
    </main>
  );
}

export default Login;
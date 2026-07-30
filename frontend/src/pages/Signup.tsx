import { useState } from "react";
import { useNavigate } from "react-router-dom";

import FormInput from "../components/FormInput";

function Signup() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");
  const [message, setMessage] = useState("");

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
      setMessage("Please complete all fields.");
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

    if (password !== confirmPassword) {
      setMessage(
        "The passwords do not match.",
      );
      return;
    }

    const newUser = {
      username: username.trim(),
      email: email.trim().toLowerCase(),
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

    navigate("/profile");
  };

  const handleKeyDown = (
    event: React.KeyboardEvent,
  ) => {
    if (event.key === "Enter") {
      registerUser();
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 p-6">
      <section className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <h1 className="text-center text-3xl font-bold text-gray-800">
          Create Account
        </h1>

        <p className="mt-2 text-center text-gray-500">
          Register to create and manage RPG
          characters.
        </p>

        <div
          className="mt-6 space-y-4"
          onKeyDown={handleKeyDown}
        >
          <FormInput
            label="Username"
            id="username"
            type="text"
            value={username}
            placeholder="Enter username"
            required
            onChange={(event) =>
              setUsername(event.target.value)
            }
          />

          <FormInput
            label="Full Name"
            id="name"
            type="text"
            value={name}
            placeholder="Enter your full name"
            required
            onChange={(event) =>
              setName(event.target.value)
            }
          />

          <FormInput
            label="Email"
            id="email"
            type="email"
            value={email}
            placeholder="Enter your email"
            required
            onChange={(event) =>
              setEmail(event.target.value)
            }
          />

          <FormInput
            label="Birthday"
            id="birthday"
            type="date"
            value={birthday}
            required
            onChange={(event) =>
              setBirthday(event.target.value)
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

          <FormInput
            label="Confirm Password"
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            placeholder="Repeat password"
            required
            onChange={(event) =>
              setConfirmPassword(
                event.target.value,
              )
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
            onClick={registerUser}
            className="w-full rounded-md bg-green-600 py-3 font-semibold text-white transition hover:bg-green-700"
          >
            Create Account
          </button>

          <button
            type="button"
            onClick={() => navigate("/login")}
            className="w-full rounded-md bg-gray-600 py-3 font-semibold text-white transition hover:bg-gray-700"
          >
            Back to Login
          </button>
        </div>
      </section>
    </main>
  );
}

export default Signup;
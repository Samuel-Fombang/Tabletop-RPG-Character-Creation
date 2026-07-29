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

  const getSavedUser = (): RegisteredUser | null => {
    const savedUser =
      localStorage.getItem("registeredUser");

    if (!savedUser) {
      return null;
    }

    try {
      return JSON.parse(savedUser) as RegisteredUser;
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
    navigate("/login");
  };

  return (
    <>
      <Navbar />

      <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-8">
        <section className="w-full max-w-lg rounded-xl bg-white p-8 shadow-lg">
          <h1 className="text-center text-3xl font-bold text-gray-800">
            User Profile
          </h1>

          <p className="mt-2 text-center text-gray-500">
            View your account information and
            manage your characters.
          </p>

          {user ? (
            <>
              <div className="mt-8 space-y-4 rounded-lg bg-slate-50 p-6">
                <div>
                  <p className="text-sm font-semibold text-gray-500">
                    Username
                  </p>

                  <p className="text-lg text-gray-800">
                    {user.username}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-500">
                    Full Name
                  </p>

                  <p className="text-lg text-gray-800">
                    {user.name}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-500">
                    Email
                  </p>

                  <p className="text-lg text-gray-800">
                    {user.email}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-500">
                    Birthday
                  </p>

                  <p className="text-lg text-gray-800">
                    {user.birthday}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() =>
                    navigate("/dashboard")
                  }
                  className="w-full rounded-md bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
                >
                  View Dashboard
                </button>

                <button
                  type="button"
                  onClick={() =>
                    navigate("/character/create")
                  }
                  className="w-full rounded-md bg-green-600 py-3 font-semibold text-white transition hover:bg-green-700"
                >
                  Create Character
                </button>
              </div>

              <button
                type="button"
                onClick={logoutUser}
                className="mt-3 w-full rounded-md bg-red-600 py-3 font-semibold text-white transition hover:bg-red-700"
              >
                Logout
              </button>
            </>
          ) : (
            <div className="mt-8 text-center">
              <p className="mb-5 text-gray-600">
                No user information was found.
                Please create an account.
              </p>

              <button
                type="button"
                onClick={() =>
                  navigate("/signup")
                }
                className="w-full rounded-md bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                Create Account
              </button>
            </div>
          )}
        </section>
      </main>
    </>
  );
}

export default UserProfile;
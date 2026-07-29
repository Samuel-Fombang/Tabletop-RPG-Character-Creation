import { useEffect, useState } from "react";
import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import CharacterCard from "../components/CharacterCard";
import Navbar from "../components/Navbar";

import { getCharacters } from "../services/characterStorage";

import type { CharacterData } from "../types/character";

type RegisteredUser = {
  username: string;
  email: string;
  name: string;
  birthday: string;
};

type DashboardLocationState = {
  message?: string;
};

function CharacterDashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  const [characters, setCharacters] =
    useState<CharacterData[]>([]);

  const [message, setMessage] = useState("");

  const getCurrentUser =
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
          "Unable to read registered user:",
          error,
        );

        return null;
      }
    };

  useEffect(() => {
    const currentUser = getCurrentUser();

    if (!currentUser?.email) {
      navigate("/login");
      return;
    }

    const allCharacters = getCharacters();

    const userCharacters =
      allCharacters.filter(
        (character) =>
          character.ownerEmail ===
          currentUser.email,
      );

    setCharacters(userCharacters);

    const locationState =
      location.state as
        | DashboardLocationState
        | null;

    if (locationState?.message) {
      setMessage(
        locationState.message,
      );

      window.history.replaceState(
        {},
        document.title,
      );
    }
  }, [location.state, navigate]);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-100 px-4 py-8">
        <section className="mx-auto max-w-6xl">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-4xl font-bold text-slate-800">
                Character Dashboard
              </h1>

              <p className="mt-2 text-gray-600">
                View and manage your RPG
                characters.
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                navigate(
                  "/character/create",
                )
              }
              className="rounded-lg bg-green-600 px-5 py-3 font-semibold text-white transition hover:bg-green-700"
            >
              + New Character
            </button>
          </div>

          {message && (
            <p
              className="mb-6 rounded-md bg-green-50 px-4 py-3 text-sm text-green-700"
              role="status"
            >
              {message}
            </p>
          )}

          {characters.length === 0 ? (
            <div className="rounded-xl bg-white p-10 text-center shadow">
              <h2 className="mb-3 text-2xl font-bold text-slate-800">
                No Characters Found
              </h2>

              <p className="mb-6 text-gray-600">
                You have not created any RPG
                characters yet.
              </p>

              <button
                type="button"
                onClick={() =>
                  navigate(
                    "/character/create",
                  )
                }
                className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                Create Character
              </button>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {characters.map(
                (character) => (
                  <CharacterCard
                    key={character.id}
                    character={
                      character
                    }
                  />
                ),
              )}
            </div>
          )}
        </section>
      </main>
    </>
  );
}

export default CharacterDashboard;
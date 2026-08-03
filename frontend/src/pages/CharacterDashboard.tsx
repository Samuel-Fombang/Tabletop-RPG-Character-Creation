import {
  useEffect,
  useMemo,
  useState,
} from "react";

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

type SortOption =
  | "name"
  | "level"
  | "strength"
  | "hp";

function CharacterDashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  const [characters, setCharacters] =
    useState<CharacterData[]>([]);

  const [currentUser, setCurrentUser] =
    useState<RegisteredUser | null>(null);

  const [message, setMessage] =
    useState("");

  const [searchTerm, setSearchTerm] =
    useState("");

  const [selectedRace, setSelectedRace] =
    useState("All");

  const [sortOption, setSortOption] =
    useState<SortOption>("name");

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
    const loggedInUser =
      getCurrentUser();

    if (!loggedInUser?.email) {
      navigate("/login", {
        replace: true,
      });

      return;
    }

    setCurrentUser(loggedInUser);

    const allCharacters =
      getCharacters();

    const userCharacters =
      allCharacters.filter(
        (character) =>
          character.ownerEmail ===
          loggedInUser.email,
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

  const highestLevel = useMemo(() => {
    if (characters.length === 0) {
      return 0;
    }

    return Math.max(
      ...characters.map(
        (character) =>
          character.characterLevel ??
          character.level ??
          1,
      ),
    );
  }, [characters]);

  const averageStrength = useMemo(() => {
    if (characters.length === 0) {
      return 0;
    }

    const totalStrength =
      characters.reduce(
        (total, character) =>
          total +
          character.strength,
        0,
      );

    return Math.round(
      totalStrength /
        characters.length,
    );
  }, [characters]);

  const totalMaximumHp = useMemo(
    () =>
      characters.reduce(
        (total, character) =>
          total +
          character.maxHp,
        0,
      ),
    [characters],
  );

  const races = useMemo(() => {
    const uniqueRaces =
      characters.map(
        (character) =>
          character.primaryRace ??
          character.race ??
          "Unknown",
      );

    return [
      "All",
      ...Array.from(
        new Set(uniqueRaces),
      ).sort(),
    ];
  }, [characters]);

  const visibleCharacters = useMemo(() => {
    const normalizedSearch =
      searchTerm
        .trim()
        .toLowerCase();

    const filteredCharacters =
      characters.filter(
        (character) => {
          const race =
            character.primaryRace ??
            character.race ??
            "Unknown";

          const matchesSearch =
            normalizedSearch === "" ||
            character.name
              .toLowerCase()
              .includes(
                normalizedSearch,
              ) ||
            (
              character.nickname ??
              ""
            )
              .toLowerCase()
              .includes(
                normalizedSearch,
              ) ||
            (
              character.title ?? ""
            )
              .toLowerCase()
              .includes(
                normalizedSearch,
              ) ||
            race
              .toLowerCase()
              .includes(
                normalizedSearch,
              );

          const matchesRace =
            selectedRace === "All" ||
            race === selectedRace;

          return (
            matchesSearch &&
            matchesRace
          );
        },
      );

    return [
      ...filteredCharacters,
    ].sort((first, second) => {
      if (sortOption === "level") {
        const firstLevel =
          first.characterLevel ??
          first.level ??
          1;

        const secondLevel =
          second.characterLevel ??
          second.level ??
          1;

        return (
          secondLevel -
          firstLevel
        );
      }

      if (
        sortOption === "strength"
      ) {
        return (
          second.strength -
          first.strength
        );
      }

      if (sortOption === "hp") {
        return (
          second.maxHp -
          first.maxHp
        );
      }

      return first.name.localeCompare(
        second.name,
      );
    });
  }, [
    characters,
    searchTerm,
    selectedRace,
    sortOption,
  ]);

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedRace("All");
    setSortOption("name");
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-100">
        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <header className="mb-8 overflow-hidden rounded-3xl bg-gradient-to-r from-slate-950 via-indigo-950 to-purple-950 px-6 py-8 text-white shadow-xl sm:px-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-300">
                  Character Management
                </p>

                <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
                  Welcome back,{" "}
                  {currentUser?.name ||
                    currentUser?.username ||
                    "Adventurer"}
                </h1>

                <p className="mt-3 max-w-2xl leading-7 text-slate-300">
                  Create, organise and manage
                  all your tabletop RPG
                  characters from one
                  professional dashboard.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  navigate(
                    "/character/create",
                  )
                }
                className="rounded-xl bg-amber-400 px-6 py-3 font-bold text-slate-950 shadow-lg transition hover:-translate-y-0.5 hover:bg-amber-300 focus:outline-none focus:ring-4 focus:ring-amber-300/40"
              >
                + Create Character
              </button>
            </div>
          </header>

          {message && (
            <div
              className="mb-8 flex items-start justify-between rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-800 shadow-sm"
              role="status"
            >
              <span>{message}</span>

              <button
                type="button"
                onClick={() =>
                  setMessage("")
                }
                className="ml-4 text-lg font-bold text-green-700 hover:text-green-900"
                aria-label="Close message"
              >
                ×
              </button>
            </div>
          )}

          <section className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <article className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Total Characters
                  </p>

                  <p className="mt-2 text-3xl font-bold text-slate-900">
                    {characters.length}
                  </p>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-2xl transition group-hover:scale-110">
                  🧙
                </div>
              </div>
            </article>

            <article className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Highest Level
                  </p>

                  <p className="mt-2 text-3xl font-bold text-indigo-700">
                    {highestLevel}
                  </p>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-2xl transition group-hover:scale-110">
                  🏆
                </div>
              </div>
            </article>

            <article className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Average Strength
                  </p>

                  <p className="mt-2 text-3xl font-bold text-purple-700">
                    {averageStrength}
                  </p>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-2xl transition group-hover:scale-110">
                  ⚔️
                </div>
              </div>
            </article>

            <article className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Total Maximum HP
                  </p>

                  <p className="mt-2 text-3xl font-bold text-red-600">
                    {totalMaximumHp}
                  </p>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100 text-2xl transition group-hover:scale-110">
                  ❤️
                </div>
              </div>
            </article>
          </section>

          <section className="mb-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-5">
              <p className="text-sm font-semibold uppercase tracking-widest text-purple-700">
                Character Library
              </p>

              <h2 className="mt-1 text-2xl font-bold text-slate-900">
                Find Your Characters
              </h2>

              <p className="mt-2 text-sm text-slate-600">
                Search, filter and sort your
                saved RPG characters.
              </p>
            </div>

            <div className="grid gap-4 lg:grid-cols-[1fr_220px_220px_auto]">
              <div>
                <label
                  htmlFor="characterSearch"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Search
                </label>

                <input
                  id="characterSearch"
                  type="search"
                  value={searchTerm}
                  placeholder="Search by name, title or race..."
                  onChange={(event) =>
                    setSearchTerm(
                      event.target.value,
                    )
                  }
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
                />
              </div>

              <div>
                <label
                  htmlFor="raceFilter"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Race
                </label>

                <select
                  id="raceFilter"
                  value={selectedRace}
                  onChange={(event) =>
                    setSelectedRace(
                      event.target.value,
                    )
                  }
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
                >
                  {races.map((race) => (
                    <option
                      key={race}
                      value={race}
                    >
                      {race === "All"
                        ? "All Races"
                        : race}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="sortCharacters"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Sort By
                </label>

                <select
                  id="sortCharacters"
                  value={sortOption}
                  onChange={(event) =>
                    setSortOption(
                      event.target
                        .value as SortOption,
                    )
                  }
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
                >
                  <option value="name">
                    Name A–Z
                  </option>

                  <option value="level">
                    Highest Level
                  </option>

                  <option value="strength">
                    Highest Strength
                  </option>

                  <option value="hp">
                    Highest HP
                  </option>
                </select>
              </div>

              <div className="flex items-end">
                <button
                  type="button"
                  onClick={clearFilters}
                  className="w-full rounded-xl bg-slate-700 px-5 py-3 font-semibold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-200 lg:w-auto"
                >
                  Clear
                </button>
              </div>
            </div>
          </section>

          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                Your Characters
              </h2>

              <p className="mt-1 text-slate-600">
                View your heroes and continue
                their adventures.
              </p>
            </div>

            {characters.length > 0 && (
              <p className="text-sm font-medium text-slate-500">
                Showing{" "}
                {visibleCharacters.length} of{" "}
                {characters.length}{" "}
                {characters.length === 1
                  ? "character"
                  : "characters"}
              </p>
            )}
          </div>

          {characters.length === 0 ? (
            <section className="rounded-3xl border-2 border-dashed border-slate-300 bg-white px-6 py-16 text-center shadow-sm">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-purple-100 text-4xl">
                ⚔️
              </div>

              <h2 className="mt-6 text-2xl font-bold text-slate-900">
                No characters yet
              </h2>

              <p className="mx-auto mt-3 max-w-md leading-7 text-slate-600">
                Create your first RPG
                character and begin building
                your adventure.
              </p>

              <button
                type="button"
                onClick={() =>
                  navigate(
                    "/character/create",
                  )
                }
                className="mt-7 rounded-xl bg-purple-700 px-6 py-3 font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-200"
              >
                Create Your First Character
              </button>
            </section>
          ) : visibleCharacters.length ===
            0 ? (
            <section className="rounded-3xl border border-slate-200 bg-white px-6 py-14 text-center shadow-sm">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-3xl">
                🔍
              </div>

              <h2 className="mt-5 text-2xl font-bold text-slate-900">
                No matching characters
              </h2>

              <p className="mx-auto mt-3 max-w-md text-slate-600">
                Try changing your search
                text, race filter or sorting
                option.
              </p>

              <button
                type="button"
                onClick={clearFilters}
                className="mt-6 rounded-xl bg-slate-700 px-6 py-3 font-semibold text-white transition hover:bg-slate-800"
              >
                Clear Search and Filters
              </button>
            </section>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {visibleCharacters.map(
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
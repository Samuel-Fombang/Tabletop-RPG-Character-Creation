import { useEffect, useState } from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

import FormInput from "../components/FormInput";
import Navbar from "../components/Navbar";

import {
  deleteCharacter,
  getCharacterById,
  saveCharacter,
} from "../services/characterStorage";

import type { CharacterData } from "../types/character";

type RegisteredUser = {
  username: string;
  email: string;
  name: string;
  birthday: string;
};

function CharacterDetails() {
  const navigate = useNavigate();

  const { id } = useParams<{
    id: string;
  }>();

  const characterId = id ?? "";

  const [character, setCharacter] =
    useState<CharacterData | null>(null);

  const [isEditing, setIsEditing] =
    useState(false);

  const [message, setMessage] =
    useState("");

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

    const savedCharacter =
      getCharacterById(characterId);

    if (!savedCharacter) {
      setCharacter(null);
      return;
    }

    if (
      savedCharacter.ownerEmail !==
      currentUser.email
    ) {
      setCharacter(null);

      setMessage(
        "You do not have permission to view this character.",
      );

      return;
    }

    setCharacter(savedCharacter);
  }, [characterId, navigate]);

  const updateCharacterField = <
    Field extends keyof CharacterData,
  >(
    field: Field,
    value: CharacterData[Field],
  ) => {
    if (!character) {
      return;
    }

    setCharacter({
      ...character,
      [field]: value,
    });
  };

  const validateCharacter =
    (): boolean => {
      if (!character) {
        return false;
      }

      if (character.name.trim() === "") {
        setMessage(
          "Please enter a character name.",
        );

        return false;
      }

      if (character.age < 1) {
        setMessage(
          "Character age must be at least 1.",
        );

        return false;
      }

      const characterLevel =
        character.characterLevel ??
        character.level ??
        1;

      if (characterLevel < 1) {
        setMessage(
          "Character level must be at least 1.",
        );

        return false;
      }

      const stats = [
        character.strength,
        character.dexterity,
        character.constitution,
        character.mind,
        character.attunement,
      ];

      const hasInvalidStat =
        stats.some(
          (stat) =>
            stat < 1 || stat > 14,
        );

      if (hasInvalidStat) {
        setMessage(
          "All character stats must be between 1 and 14.",
        );

        return false;
      }

      return true;
    };

  const saveChanges = () => {
    if (!character) {
      return;
    }

    setMessage("");

    const currentUser = getCurrentUser();

    if (
      !currentUser?.email ||
      character.ownerEmail !==
        currentUser.email
    ) {
      setMessage(
        "You do not have permission to update this character.",
      );

      return;
    }

    if (!validateCharacter()) {
      return;
    }

    const characterLevel =
      character.characterLevel ??
      character.level ??
      1;

    const calculatedMaxHp =
      character.constitution * 10 +
      characterLevel * 5;

    const calculatedActionPoints =
      2 +
      Math.floor(
        character.dexterity / 2,
      );

    const calculatedInitiative =
      character.dexterity +
      character.mind;

    const updatedCharacter: CharacterData =
      {
        ...character,

        name: character.name.trim(),

        nickname:
          character.nickname?.trim() ??
          "",

        title:
          character.title?.trim() ?? "",

        characterLevel,

        maxHp: calculatedMaxHp,
        currentHp: calculatedMaxHp,

        actionPoints:
          calculatedActionPoints,

        initiative:
          calculatedInitiative,
      };

    saveCharacter(updatedCharacter);

    setCharacter(updatedCharacter);
    setIsEditing(false);

    setMessage(
      "Character updated successfully.",
    );
  };

  const removeCharacter = () => {
    if (!character) {
      return;
    }

    const currentUser = getCurrentUser();

    if (
      !currentUser?.email ||
      character.ownerEmail !==
        currentUser.email
    ) {
      setMessage(
        "You do not have permission to delete this character.",
      );

      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete ${character.name}? This action cannot be undone.`,
    );

    if (!confirmed) {
      return;
    }

    deleteCharacter(character.id);

    navigate("/dashboard", {
      state: {
        message:
          "Character deleted successfully.",
      },
    });
  };

  const cancelEditing = () => {
    const savedCharacter =
      getCharacterById(characterId);

    if (savedCharacter) {
      setCharacter(savedCharacter);
    }

    setMessage("");
    setIsEditing(false);
  };

  const startEditing = () => {
    setMessage("");
    setIsEditing(true);
  };

  const selectStyle = [
    "w-full rounded-xl border px-4 py-3",
    "text-slate-900 outline-none transition",
    "focus:border-purple-500",
    "focus:ring-4 focus:ring-purple-100",
    isEditing
      ? "border-slate-300 bg-white"
      : "cursor-not-allowed border-slate-200 bg-slate-100 text-slate-600",
  ].join(" ");

  if (!character) {
    return (
      <>
        <Navbar />

        <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-12">
          <section className="w-full max-w-md overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
            <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-purple-950 px-6 py-8 text-center text-white">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-purple-400 bg-slate-800 text-3xl">
                ⚔️
              </div>

              <h1 className="mt-5 text-2xl font-bold">
                Character Not Found
              </h1>
            </div>

            <div className="p-6 text-center">
              <p className="text-slate-600">
                {message ||
                  "This character does not exist or you do not have permission to view it."}
              </p>

              <button
                type="button"
                onClick={() =>
                  navigate("/dashboard")
                }
                className="mt-6 w-full rounded-xl bg-purple-700 px-5 py-3 font-semibold text-white transition hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-200"
              >
                Back to Dashboard
              </button>
            </div>
          </section>
        </main>
      </>
    );
  }

  const race =
    character.primaryRace ??
    character.race ??
    "Unknown";

  const level =
    character.characterLevel ??
    character.level ??
    1;

  const safeMaxHp = Math.max(
    character.maxHp,
    1,
  );

  const hpPercentage = Math.min(
    Math.max(
      (character.currentHp /
        safeMaxHp) *
        100,
      0,
    ),
    100,
  );

  const characterInitial =
    character.name
      .trim()
      .charAt(0)
      .toUpperCase() || "?";

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-100 px-4 py-8 sm:px-6 lg:px-8">
        <section className="mx-auto max-w-6xl">
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
            <header className="bg-gradient-to-r from-slate-950 via-indigo-950 to-purple-950 px-6 py-8 text-white sm:px-8">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                  <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl border-2 border-amber-400 bg-slate-800 text-5xl font-bold text-amber-300 shadow-xl">
                    {characterInitial}
                  </div>

                  <div>
                    <div className="mb-3 flex flex-wrap gap-2">
                      <span className="rounded-full bg-purple-700 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-purple-100">
                        {race}
                      </span>

                      <span className="rounded-full bg-amber-400 px-3 py-1 text-xs font-bold uppercase tracking-wide text-slate-950">
                        Level {level}
                      </span>
                    </div>

                    <h1 className="text-3xl font-bold sm:text-4xl">
                      {character.name}
                    </h1>

                    {character.nickname && (
                      <p className="mt-2 text-lg italic text-purple-200">
                        “{character.nickname}”
                      </p>
                    )}

                    <p className="mt-2 text-slate-300">
                      {character.title ||
                        "Untitled Adventurer"}
                    </p>
                  </div>
                </div>

                {!isEditing && (
                  <button
                    type="button"
                    onClick={startEditing}
                    className="rounded-xl bg-amber-400 px-6 py-3 font-bold text-slate-950 shadow-lg transition hover:-translate-y-0.5 hover:bg-amber-300 focus:outline-none focus:ring-4 focus:ring-amber-300/40"
                  >
                    Edit Character
                  </button>
                )}
              </div>

              <div className="mt-8">
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-semibold text-slate-200">
                    Hit Points
                  </span>

                  <span className="font-bold text-red-300">
                    {character.currentHp}/
                    {character.maxHp}
                  </span>
                </div>

                <div className="h-4 overflow-hidden rounded-full border border-slate-600 bg-slate-800">
                  <div
                    className="h-full rounded-full bg-red-500 transition-all duration-500"
                    style={{
                      width: `${hpPercentage}%`,
                    }}
                  />
                </div>
              </div>
            </header>

            <div className="p-6 sm:p-8">
              {message && (
                <div
                  className={`mb-8 flex items-start justify-between rounded-xl border px-4 py-3 text-sm ${
                    message
                      .toLowerCase()
                      .includes(
                        "successfully",
                      )
                      ? "border-green-200 bg-green-50 text-green-800"
                      : "border-red-200 bg-red-50 text-red-800"
                  }`}
                  role="alert"
                >
                  <span>{message}</span>

                  <button
                    type="button"
                    onClick={() =>
                      setMessage("")
                    }
                    className="ml-4 text-lg font-bold"
                    aria-label="Close message"
                  >
                    ×
                  </button>
                </div>
              )}

              <div className="grid gap-8 xl:grid-cols-[1.4fr_0.8fr]">
                <div className="space-y-8">
                  <section className="rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
                    <div className="mb-6">
                      <p className="text-sm font-semibold uppercase tracking-widest text-purple-700">
                        Character Profile
                      </p>

                      <h2 className="mt-1 text-2xl font-bold text-slate-900">
                        Basic Information
                      </h2>
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">
                      <FormInput
                        label="Name"
                        id="name"
                        type="text"
                        value={character.name}
                        required
                        disabled={!isEditing}
                        onChange={(event) =>
                          updateCharacterField(
                            "name",
                            event.target.value,
                          )
                        }
                      />

                      <FormInput
                        label="Nickname"
                        id="nickname"
                        type="text"
                        value={
                          character.nickname ??
                          ""
                        }
                        disabled={!isEditing}
                        onChange={(event) =>
                          updateCharacterField(
                            "nickname",
                            event.target.value,
                          )
                        }
                      />

                      <FormInput
                        label="Title"
                        id="title"
                        type="text"
                        value={
                          character.title ?? ""
                        }
                        disabled={!isEditing}
                        onChange={(event) =>
                          updateCharacterField(
                            "title",
                            event.target.value,
                          )
                        }
                      />

                      <FormInput
                        label="Age"
                        id="age"
                        type="number"
                        value={character.age}
                        min={1}
                        disabled={!isEditing}
                        onChange={(event) =>
                          updateCharacterField(
                            "age",
                            Number(
                              event.target.value,
                            ),
                          )
                        }
                      />

                      <div>
                        <label
                          htmlFor="primaryRace"
                          className="mb-2 block text-sm font-semibold text-slate-700"
                        >
                          Primary Race
                        </label>

                        <select
                          id="primaryRace"
                          value={
                            character.primaryRace ??
                            character.race ??
                            "Human"
                          }
                          disabled={!isEditing}
                          onChange={(event) =>
                            updateCharacterField(
                              "primaryRace",
                              event.target.value,
                            )
                          }
                          className={
                            selectStyle
                          }
                        >
                          <option value="Human">
                            Human
                          </option>

                          <option value="Elf">
                            Elf
                          </option>

                          <option value="Dwarf">
                            Dwarf
                          </option>

                          <option value="Tiefling">
                            Tiefling
                          </option>

                          <option value="Mermaid">
                            Mermaid
                          </option>
                        </select>
                      </div>

                      <FormInput
                        label="Character Level"
                        id="characterLevel"
                        type="number"
                        value={level}
                        min={1}
                        disabled={!isEditing}
                        onChange={(event) =>
                          updateCharacterField(
                            "characterLevel",
                            Number(
                              event.target.value,
                            ),
                          )
                        }
                      />
                    </div>
                  </section>

                  <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                    <div className="mb-6">
                      <p className="text-sm font-semibold uppercase tracking-widest text-indigo-700">
                        Physical Attributes
                      </p>

                      <h2 className="mt-1 text-2xl font-bold text-slate-900">
                        Primary Statistics
                      </h2>
                    </div>

                    <div className="grid gap-5 md:grid-cols-3">
                      <FormInput
                        label="Strength"
                        id="strength"
                        type="number"
                        value={
                          character.strength
                        }
                        min={1}
                        max={14}
                        disabled={!isEditing}
                        onChange={(event) =>
                          updateCharacterField(
                            "strength",
                            Number(
                              event.target.value,
                            ),
                          )
                        }
                      />

                      <FormInput
                        label="Dexterity"
                        id="dexterity"
                        type="number"
                        value={
                          character.dexterity
                        }
                        min={1}
                        max={14}
                        disabled={!isEditing}
                        onChange={(event) =>
                          updateCharacterField(
                            "dexterity",
                            Number(
                              event.target.value,
                            ),
                          )
                        }
                      />

                      <FormInput
                        label="Constitution"
                        id="constitution"
                        type="number"
                        value={
                          character.constitution
                        }
                        min={1}
                        max={14}
                        disabled={!isEditing}
                        onChange={(event) =>
                          updateCharacterField(
                            "constitution",
                            Number(
                              event.target.value,
                            ),
                          )
                        }
                      />
                    </div>
                  </section>

                  <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                    <div className="mb-6">
                      <p className="text-sm font-semibold uppercase tracking-widest text-purple-700">
                        Mental Attributes
                      </p>

                      <h2 className="mt-1 text-2xl font-bold text-slate-900">
                        Mental Statistics
                      </h2>
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">
                      <FormInput
                        label="Mind"
                        id="mind"
                        type="number"
                        value={character.mind}
                        min={1}
                        max={14}
                        disabled={!isEditing}
                        onChange={(event) =>
                          updateCharacterField(
                            "mind",
                            Number(
                              event.target.value,
                            ),
                          )
                        }
                      />

                      <FormInput
                        label="Attunement"
                        id="attunement"
                        type="number"
                        value={
                          character.attunement
                        }
                        min={1}
                        max={14}
                        disabled={!isEditing}
                        onChange={(event) =>
                          updateCharacterField(
                            "attunement",
                            Number(
                              event.target.value,
                            ),
                          )
                        }
                      />
                    </div>
                  </section>
                </div>

                <aside className="space-y-6">
                  <section className="rounded-2xl bg-slate-900 p-6 text-white shadow-lg">
                    <p className="text-sm font-semibold uppercase tracking-widest text-amber-300">
                      Combat Overview
                    </p>

                    <h2 className="mt-1 text-2xl font-bold">
                      Derived Statistics
                    </h2>

                    <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
                      <div className="rounded-xl border border-slate-700 bg-slate-800 p-4">
                        <div className="flex items-center justify-between">
                          <span className="text-2xl">
                            ❤️
                          </span>

                          <span className="text-3xl font-bold text-red-400">
                            {character.maxHp}
                          </span>
                        </div>

                        <p className="mt-3 text-sm font-semibold text-slate-300">
                          Maximum HP
                        </p>
                      </div>

                      <div className="rounded-xl border border-slate-700 bg-slate-800 p-4">
                        <div className="flex items-center justify-between">
                          <span className="text-2xl">
                            🩸
                          </span>

                          <span className="text-3xl font-bold text-red-300">
                            {
                              character.currentHp
                            }
                          </span>
                        </div>

                        <p className="mt-3 text-sm font-semibold text-slate-300">
                          Current HP
                        </p>
                      </div>

                      <div className="rounded-xl border border-slate-700 bg-slate-800 p-4">
                        <div className="flex items-center justify-between">
                          <span className="text-2xl">
                            ⚡
                          </span>

                          <span className="text-3xl font-bold text-amber-300">
                            {
                              character.actionPoints
                            }
                          </span>
                        </div>

                        <p className="mt-3 text-sm font-semibold text-slate-300">
                          Action Points
                        </p>
                      </div>

                      <div className="rounded-xl border border-slate-700 bg-slate-800 p-4">
                        <div className="flex items-center justify-between">
                          <span className="text-2xl">
                            🛡️
                          </span>

                          <span className="text-3xl font-bold text-purple-300">
                            {
                              character.initiative
                            }
                          </span>
                        </div>

                        <p className="mt-3 text-sm font-semibold text-slate-300">
                          Initiative
                        </p>
                      </div>
                    </div>
                  </section>

                  <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <h2 className="text-lg font-bold text-slate-900">
                      Character Actions
                    </h2>

                    <p className="mt-2 text-sm text-slate-600">
                      Manage this character or
                      return to your dashboard.
                    </p>

                    <div className="mt-6 space-y-3">
                      <button
                        type="button"
                        onClick={() =>
                          navigate(
                            "/dashboard",
                          )
                        }
                        className="w-full rounded-xl bg-slate-700 px-5 py-3 font-semibold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-200"
                      >
                        ← Back to Dashboard
                      </button>

                      {isEditing && (
                        <>
                          <button
                            type="button"
                            onClick={
                              saveChanges
                            }
                            className="w-full rounded-xl bg-green-600 px-5 py-3 font-semibold text-white transition hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-200"
                          >
                            Save Changes
                          </button>

                          <button
                            type="button"
                            onClick={
                              cancelEditing
                            }
                            className="w-full rounded-xl bg-amber-500 px-5 py-3 font-semibold text-slate-950 transition hover:bg-amber-400 focus:outline-none focus:ring-4 focus:ring-amber-200"
                          >
                            Cancel Changes
                          </button>
                        </>
                      )}

                      <button
                        type="button"
                        onClick={
                          removeCharacter
                        }
                        className="w-full rounded-xl border border-red-200 bg-red-50 px-5 py-3 font-semibold text-red-700 transition hover:bg-red-600 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-200"
                      >
                        Delete Character
                      </button>
                    </div>
                  </section>
                </aside>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default CharacterDetails;
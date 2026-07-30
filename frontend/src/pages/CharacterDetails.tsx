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

  const getCurrentUser = (): RegisteredUser | null => {
    const savedUser =
      localStorage.getItem("registeredUser");

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

  const validateCharacter = (): boolean => {
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
      character.characterLevel ?? 1;

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

    const hasInvalidStat = stats.some(
      (stat) => stat < 1 || stat > 14,
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
      character.characterLevel ?? 1;

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

    const updatedCharacter: CharacterData = {
      ...character,

      name: character.name.trim(),

      nickname:
        character.nickname?.trim() ?? "",

      title:
        character.title?.trim() ?? "",

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
      `Are you sure you want to delete ${character.name}?`,
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

  const selectStyle =
    "w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 disabled:bg-gray-100";

  if (!character) {
    return (
      <>
        <Navbar />

        <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
          <section className="w-full max-w-md rounded-xl bg-white p-8 text-center shadow-lg">
            <h1 className="text-2xl font-bold text-gray-800">
              Character Not Found
            </h1>

            <p className="mt-3 text-gray-600">
              {message ||
                "This character does not exist or you do not have permission to view it."}
            </p>

            <button
              type="button"
              onClick={() =>
                navigate("/dashboard")
              }
              className="mt-6 w-full rounded-md bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Back to Dashboard
            </button>
          </section>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-100 px-4 py-8">
        <section className="mx-auto w-full max-w-4xl rounded-xl bg-white p-6 shadow-lg">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                {character.name}
              </h1>

              <p className="mt-1 text-gray-600">
                {character.nickname ||
                  "No nickname"}
              </p>
            </div>

            {!isEditing && (
              <button
                type="button"
                onClick={() =>
                  setIsEditing(true)
                }
                className="rounded-md bg-blue-600 px-5 py-2 font-semibold text-white transition hover:bg-blue-700"
              >
                Edit Character
              </button>
            )}
          </div>

          {message && (
            <p
              className="mt-6 rounded-md bg-blue-50 px-4 py-3 text-sm text-blue-700"
              role="alert"
            >
              {message}
            </p>
          )}

          <div className="mt-8 space-y-8">
            <section>
              <h2 className="mb-4 text-xl font-bold text-gray-800">
                Character Information
              </h2>

              <div className="grid gap-4 md:grid-cols-2">
                <FormInput
                  label="Name"
                  id="name"
                  type="text"
                  value={character.name}
                  required
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
                    character.nickname ?? ""
                  }
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
                    className="mb-1 block text-sm font-semibold text-gray-700"
                  >
                    Primary Race
                  </label>

                  <select
                    id="primaryRace"
                    value={
                      character.primaryRace ??
                      "Human"
                    }
                    disabled={!isEditing}
                    onChange={(event) =>
                      updateCharacterField(
                        "primaryRace",
                        event.target.value,
                      )
                    }
                    className={selectStyle}
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
                  value={
                    character.characterLevel ??
                    1
                  }
                  min={1}
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

            <section>
              <h2 className="mb-4 text-xl font-bold text-gray-800">
                Primary Statistics
              </h2>

              <div className="grid gap-4 md:grid-cols-3">
                <FormInput
                  label="Strength"
                  id="strength"
                  type="number"
                  value={character.strength}
                  min={1}
                  max={14}
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

            <section>
              <h2 className="mb-4 text-xl font-bold text-gray-800">
                Mental Statistics
              </h2>

              <div className="grid gap-4 md:grid-cols-2">
                <FormInput
                  label="Mind"
                  id="mind"
                  type="number"
                  value={character.mind}
                  min={1}
                  max={14}
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

            <section>
              <h2 className="mb-4 text-xl font-bold text-gray-800">
                Derived Statistics
              </h2>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-lg bg-slate-100 p-4 text-center">
                  <p className="text-sm font-semibold text-gray-500">
                    Maximum HP
                  </p>

                  <p className="mt-2 text-2xl font-bold text-gray-800">
                    {character.maxHp}
                  </p>
                </div>

                <div className="rounded-lg bg-slate-100 p-4 text-center">
                  <p className="text-sm font-semibold text-gray-500">
                    Current HP
                  </p>

                  <p className="mt-2 text-2xl font-bold text-gray-800">
                    {character.currentHp}
                  </p>
                </div>

                <div className="rounded-lg bg-slate-100 p-4 text-center">
                  <p className="text-sm font-semibold text-gray-500">
                    Action Points
                  </p>

                  <p className="mt-2 text-2xl font-bold text-gray-800">
                    {character.actionPoints}
                  </p>
                </div>

                <div className="rounded-lg bg-slate-100 p-4 text-center">
                  <p className="text-sm font-semibold text-gray-500">
                    Initiative
                  </p>

                  <p className="mt-2 text-2xl font-bold text-gray-800">
                    {character.initiative}
                  </p>
                </div>
              </div>
            </section>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() =>
                  navigate("/dashboard")
                }
                className="w-full rounded-md bg-gray-600 py-3 font-semibold text-white transition hover:bg-gray-700"
              >
                Back to Dashboard
              </button>

              {isEditing && (
                <>
                  <button
                    type="button"
                    onClick={cancelEditing}
                    className="w-full rounded-md bg-orange-500 py-3 font-semibold text-white transition hover:bg-orange-600"
                  >
                    Cancel Changes
                  </button>

                  <button
                    type="button"
                    onClick={saveChanges}
                    className="w-full rounded-md bg-green-600 py-3 font-semibold text-white transition hover:bg-green-700"
                  >
                    Save Changes
                  </button>
                </>
              )}

              <button
                type="button"
                onClick={removeCharacter}
                className="w-full rounded-md bg-red-600 py-3 font-semibold text-white transition hover:bg-red-700"
              >
                Delete Character
              </button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default CharacterDetails;
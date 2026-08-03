import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import FormInput from "../components/FormInput";
import Navbar from "../components/Navbar";

import { saveCharacter } from "../services/characterStorage";

import type { CharacterData } from "../types/character";

type RegisteredUser = {
  username: string;
  email: string;
  name: string;
  birthday: string;
};

function CharacterCreationPage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [title, setTitle] = useState("");
  const [age, setAge] = useState(18);

  const [primaryRace, setPrimaryRace] =
    useState("Human");

  const [characterLevel, setCharacterLevel] =
    useState(1);

  const [strength, setStrength] = useState(1);
  const [dexterity, setDexterity] = useState(1);
  const [constitution, setConstitution] =
    useState(1);
  const [mind, setMind] = useState(1);
  const [attunement, setAttunement] =
    useState(1);

  const [message, setMessage] = useState("");
  const [isSaving, setIsSaving] =
    useState(false);

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

  const calculatedMaxHp = useMemo(
    () =>
      constitution * 10 +
      characterLevel * 5,
    [constitution, characterLevel],
  );

  const calculatedActionPoints = useMemo(
    () =>
      2 + Math.floor(dexterity / 2),
    [dexterity],
  );

  const calculatedInitiative = useMemo(
    () => dexterity + mind,
    [dexterity, mind],
  );

  const totalAttributePoints = useMemo(
    () =>
      strength +
      dexterity +
      constitution +
      mind +
      attunement,
    [
      strength,
      dexterity,
      constitution,
      mind,
      attunement,
    ],
  );

  const validateCharacter =
    (): boolean => {
      if (name.trim() === "") {
        setMessage(
          "Please enter a character name.",
        );

        return false;
      }

      if (age < 1) {
        setMessage(
          "Character age must be at least 1.",
        );

        return false;
      }

      if (characterLevel < 1) {
        setMessage(
          "Character level must be at least 1.",
        );

        return false;
      }

      const stats = [
        strength,
        dexterity,
        constitution,
        mind,
        attunement,
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

  const createFrontendCharacter = (
    ownerEmail: string,
    maxHp: number,
    currentHp: number,
    actionPoints: number,
    initiative: number,
  ): CharacterData => {
    return {
      id: crypto.randomUUID(),
      ownerEmail,

      name: name.trim(),
      nickname: nickname.trim(),
      title: title.trim(),
      age,

      primaryRace,
      characterLevel,

      strength,
      dexterity,
      constitution,
      mind,
      attunement,

      maxHp,
      currentHp,
      actionPoints,
      initiative,
    };
  };

  const calculateCharacter =
    async () => {
      setMessage("");

      const currentUser =
        getCurrentUser();

      if (!currentUser?.email) {
        setMessage(
          "You must be logged in before creating a character.",
        );

        return;
      }

      if (!validateCharacter()) {
        return;
      }

      setIsSaving(true);

      try {
        const response = await fetch(
          "http://localhost:5280/api/character/calculate",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              name: name.trim(),
              nickname:
                nickname.trim(),
              title: title.trim(),
              age,
              primaryRace,
              characterLevel,
              strength,
              dexterity,
              constitution,
              mind,
              attunement,
            }),
          },
        );

        if (!response.ok) {
          throw new Error(
            "Backend calculation failed.",
          );
        }

        const data =
          await response.json();

        const character: CharacterData =
          {
            id: String(
              data.id ??
                crypto.randomUUID(),
            ),

            ownerEmail:
              currentUser.email,

            name: String(
              data.name ?? name.trim(),
            ),

            nickname: String(
              data.nickname ??
                nickname.trim(),
            ),

            title: String(
              data.title ??
                title.trim(),
            ),

            age: Number(
              data.age ?? age,
            ),

            primaryRace: String(
              data.primaryRace ??
                primaryRace,
            ),

            characterLevel: Number(
              data.characterLevel ??
                characterLevel,
            ),

            strength: Number(
              data.strength ??
                strength,
            ),

            dexterity: Number(
              data.dexterity ??
                dexterity,
            ),

            constitution: Number(
              data.constitution ??
                constitution,
            ),

            mind: Number(
              data.mind ?? mind,
            ),

            attunement: Number(
              data.attunement ??
                attunement,
            ),

            maxHp: Number(
              data.maxHp ??
                calculatedMaxHp,
            ),

            currentHp: Number(
              data.currentHp ??
                calculatedMaxHp,
            ),

            actionPoints: Number(
              data.actionPoints ??
                calculatedActionPoints,
            ),

            initiative: Number(
              data.initiative ??
                calculatedInitiative,
            ),
          };

        saveCharacter(character);

        navigate("/dashboard", {
          state: {
            message:
              "Character created successfully using the backend.",
          },
        });
      } catch (error) {
        console.log(
          "Backend unavailable. Using frontend calculation.",
          error,
        );

        const character =
          createFrontendCharacter(
            currentUser.email,
            calculatedMaxHp,
            calculatedMaxHp,
            calculatedActionPoints,
            calculatedInitiative,
          );

        saveCharacter(character);

        navigate("/dashboard", {
          state: {
            message:
              "Character created successfully in frontend mode.",
          },
        });
      } finally {
        setIsSaving(false);
      }
    };

  const selectStyle =
    "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-purple-500 focus:ring-4 focus:ring-purple-100";

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-100 px-4 py-8 sm:px-6 lg:px-8">
        <section className="mx-auto max-w-6xl">
          <header className="mb-8 overflow-hidden rounded-3xl bg-gradient-to-r from-slate-950 via-indigo-950 to-purple-950 px-6 py-8 text-white shadow-xl sm:px-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-amber-300">
                  New Adventure
                </p>

                <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
                  Create Your Character
                </h1>

                <p className="mt-3 max-w-2xl text-slate-300">
                  Build your hero by entering
                  their identity, race, level,
                  and primary attributes.
                </p>
              </div>

              <div className="flex h-20 w-20 items-center justify-center rounded-2xl border-2 border-amber-400 bg-slate-800 text-4xl shadow-xl">
                ⚔️
              </div>
            </div>
          </header>

          <div className="grid gap-8 xl:grid-cols-[1.35fr_0.65fr]">
            <div className="space-y-8">
              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-6">
                  <p className="text-sm font-semibold uppercase tracking-widest text-purple-700">
                    Step 1
                  </p>

                  <h2 className="mt-1 text-2xl font-bold text-slate-900">
                    Character Information
                  </h2>

                  <p className="mt-2 text-sm text-slate-600">
                    Enter the basic details
                    that describe your
                    character.
                  </p>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <FormInput
                    label="Name"
                    id="name"
                    type="text"
                    value={name}
                    placeholder="Enter character name"
                    required
                    onChange={(event) =>
                      setName(
                        event.target.value,
                      )
                    }
                  />

                  <FormInput
                    label="Nickname"
                    id="nickname"
                    type="text"
                    value={nickname}
                    placeholder="Example: The Brave"
                    onChange={(event) =>
                      setNickname(
                        event.target.value,
                      )
                    }
                  />

                  <FormInput
                    label="Title"
                    id="title"
                    type="text"
                    value={title}
                    placeholder="Example: Guardian of Eteria"
                    onChange={(event) =>
                      setTitle(
                        event.target.value,
                      )
                    }
                  />

                  <FormInput
                    label="Age"
                    id="age"
                    type="number"
                    value={age}
                    min={1}
                    onChange={(event) =>
                      setAge(
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
                      value={primaryRace}
                      onChange={(event) =>
                        setPrimaryRace(
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
                    value={
                      characterLevel
                    }
                    min={1}
                    onChange={(event) =>
                      setCharacterLevel(
                        Number(
                          event.target.value,
                        ),
                      )
                    }
                  />
                </div>
              </section>

              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-6">
                  <p className="text-sm font-semibold uppercase tracking-widest text-indigo-700">
                    Step 2
                  </p>

                  <h2 className="mt-1 text-2xl font-bold text-slate-900">
                    Physical Statistics
                  </h2>

                  <p className="mt-2 text-sm text-slate-600">
                    Each statistic must be
                    between 1 and 14.
                  </p>
                </div>

                <div className="grid gap-5 md:grid-cols-3">
                  <FormInput
                    label="Strength"
                    id="strength"
                    type="number"
                    value={strength}
                    min={1}
                    max={14}
                    onChange={(event) =>
                      setStrength(
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
                    value={dexterity}
                    min={1}
                    max={14}
                    onChange={(event) =>
                      setDexterity(
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
                    value={constitution}
                    min={1}
                    max={14}
                    onChange={(event) =>
                      setConstitution(
                        Number(
                          event.target.value,
                        ),
                      )
                    }
                  />
                </div>
              </section>

              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-6">
                  <p className="text-sm font-semibold uppercase tracking-widest text-purple-700">
                    Step 3
                  </p>

                  <h2 className="mt-1 text-2xl font-bold text-slate-900">
                    Mental Statistics
                  </h2>

                  <p className="mt-2 text-sm text-slate-600">
                    Choose values for your
                    character’s intelligence
                    and magical connection.
                  </p>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <FormInput
                    label="Mind"
                    id="mind"
                    type="number"
                    value={mind}
                    min={1}
                    max={14}
                    onChange={(event) =>
                      setMind(
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
                    value={attunement}
                    min={1}
                    max={14}
                    onChange={(event) =>
                      setAttunement(
                        Number(
                          event.target.value,
                        ),
                      )
                    }
                  />
                </div>
              </section>

              {message && (
                <div
                  className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
                  role="alert"
                >
                  {message}
                </div>
              )}

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() =>
                    navigate(
                      "/dashboard",
                    )
                  }
                  disabled={isSaving}
                  className="w-full rounded-xl bg-slate-700 px-5 py-3 font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  ← Cancel
                </button>

                <button
                  type="button"
                  onClick={
                    calculateCharacter
                  }
                  disabled={isSaving}
                  className="w-full rounded-xl bg-purple-700 px-5 py-3 font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-200 disabled:cursor-not-allowed disabled:bg-purple-300"
                >
                  {isSaving
                    ? "Creating Character..."
                    : "Create Character"}
                </button>
              </div>
            </div>

            <aside className="space-y-6 xl:sticky xl:top-28 xl:self-start">
              <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg">
                <div className="bg-gradient-to-r from-slate-900 to-purple-950 p-6 text-white">
                  <p className="text-sm font-semibold uppercase tracking-widest text-amber-300">
                    Live Preview
                  </p>

                  <div className="mt-5 flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-amber-400 bg-slate-800 text-3xl font-bold text-amber-300">
                      {name
                        .trim()
                        .charAt(0)
                        .toUpperCase() ||
                        "?"}
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold">
                        {name.trim() ||
                          "Unnamed Hero"}
                      </h2>

                      <p className="mt-1 italic text-purple-200">
                        {nickname.trim()
                          ? `“${nickname.trim()}”`
                          : "No nickname"}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    <span className="rounded-full bg-purple-700 px-3 py-1 text-xs font-semibold">
                      {primaryRace}
                    </span>

                    <span className="rounded-full bg-amber-400 px-3 py-1 text-xs font-bold text-slate-950">
                      Level{" "}
                      {characterLevel}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-bold text-slate-900">
                    Calculated Statistics
                  </h3>

                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <div className="rounded-xl bg-red-50 p-4">
                      <p className="text-xs font-semibold uppercase tracking-wide text-red-600">
                        Maximum HP
                      </p>

                      <p className="mt-2 text-2xl font-bold text-red-700">
                        {calculatedMaxHp}
                      </p>
                    </div>

                    <div className="rounded-xl bg-amber-50 p-4">
                      <p className="text-xs font-semibold uppercase tracking-wide text-amber-700">
                        Action Points
                      </p>

                      <p className="mt-2 text-2xl font-bold text-amber-700">
                        {
                          calculatedActionPoints
                        }
                      </p>
                    </div>

                    <div className="rounded-xl bg-purple-50 p-4">
                      <p className="text-xs font-semibold uppercase tracking-wide text-purple-700">
                        Initiative
                      </p>

                      <p className="mt-2 text-2xl font-bold text-purple-700">
                        {
                          calculatedInitiative
                        }
                      </p>
                    </div>

                    <div className="rounded-xl bg-indigo-50 p-4">
                      <p className="text-xs font-semibold uppercase tracking-wide text-indigo-700">
                        Attribute Total
                      </p>

                      <p className="mt-2 text-2xl font-bold text-indigo-700">
                        {
                          totalAttributePoints
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900">
                  Character Summary
                </h3>

                <div className="mt-5 space-y-3 text-sm">
                  <div className="flex justify-between border-b border-slate-100 pb-3">
                    <span className="text-slate-500">
                      Title
                    </span>

                    <span className="max-w-[55%] text-right font-semibold text-slate-800">
                      {title.trim() ||
                        "None"}
                    </span>
                  </div>

                  <div className="flex justify-between border-b border-slate-100 pb-3">
                    <span className="text-slate-500">
                      Age
                    </span>

                    <span className="font-semibold text-slate-800">
                      {age}
                    </span>
                  </div>

                  <div className="flex justify-between border-b border-slate-100 pb-3">
                    <span className="text-slate-500">
                      Strength
                    </span>

                    <span className="font-semibold text-slate-800">
                      {strength}
                    </span>
                  </div>

                  <div className="flex justify-between border-b border-slate-100 pb-3">
                    <span className="text-slate-500">
                      Dexterity
                    </span>

                    <span className="font-semibold text-slate-800">
                      {dexterity}
                    </span>
                  </div>

                  <div className="flex justify-between border-b border-slate-100 pb-3">
                    <span className="text-slate-500">
                      Constitution
                    </span>

                    <span className="font-semibold text-slate-800">
                      {constitution}
                    </span>
                  </div>

                  <div className="flex justify-between border-b border-slate-100 pb-3">
                    <span className="text-slate-500">
                      Mind
                    </span>

                    <span className="font-semibold text-slate-800">
                      {mind}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-slate-500">
                      Attunement
                    </span>

                    <span className="font-semibold text-slate-800">
                      {attunement}
                    </span>
                  </div>
                </div>
              </section>
            </aside>
          </div>
        </section>
      </main>
    </>
  );
}

export default CharacterCreationPage;
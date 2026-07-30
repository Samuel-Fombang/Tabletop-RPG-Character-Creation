import { useState } from "react";
import { useNavigate } from "react-router-dom";

import FormInput from "../components/FormInput";
import Navbar from "../components/Navbar";

import type { CharacterData } from "../types/character";

import { saveCharacter } from "../services/characterStorage";

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

  const getCurrentUser = (): RegisteredUser | null => {
    const savedUser =
      localStorage.getItem("registeredUser");

    if (!savedUser) {
      return null;
    }

    try {
      return JSON.parse(savedUser) as RegisteredUser;
    } catch (error) {
      console.error(
        "Unable to read registered user:",
        error,
      );

      return null;
    }
  };

  const validateCharacter = (): boolean => {
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

  const calculateCharacter = async () => {
    setMessage("");

    const currentUser = getCurrentUser();

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
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
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
          }),
        },
      );

      if (!response.ok) {
        throw new Error(
          "Backend calculation failed.",
        );
      }

      const data = await response.json();

      const character: CharacterData = {
        id: String(data.id),
        ownerEmail: currentUser.email,

        name: String(data.name),
        nickname: String(data.nickname ?? ""),
        title: String(data.title ?? ""),
        age: Number(data.age),

        primaryRace: String(
          data.primaryRace,
        ),

        characterLevel: Number(
          data.characterLevel,
        ),

        strength: Number(data.strength),
        dexterity: Number(data.dexterity),
        constitution: Number(
          data.constitution,
        ),
        mind: Number(data.mind),
        attunement: Number(
          data.attunement,
        ),

        maxHp: Number(data.maxHp),
        currentHp: Number(data.currentHp),
        actionPoints: Number(
          data.actionPoints,
        ),
        initiative: Number(
          data.initiative,
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

      const calculatedMaxHp =
        constitution * 10 +
        characterLevel * 5;

      const calculatedCurrentHp =
        calculatedMaxHp;

      const calculatedActionPoints =
        2 + Math.floor(dexterity / 2);

      const calculatedInitiative =
        dexterity + mind;

      const character =
        createFrontendCharacter(
          currentUser.email,
          calculatedMaxHp,
          calculatedCurrentHp,
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
    "w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200";

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-100 px-4 py-8">
        <section className="mx-auto w-full max-w-3xl rounded-xl bg-white p-6 shadow-lg">
          <h1 className="mb-2 text-center text-3xl font-bold text-gray-800">
            Create Your Character
          </h1>

          <p className="mb-8 text-center text-gray-600">
            Enter the character information and
            statistics below.
          </p>

          <div className="space-y-8">
            <section>
              <h2 className="mb-4 text-xl font-bold text-gray-800">
                Character Information
              </h2>

              <div className="grid gap-4 md:grid-cols-2">
                <FormInput
                  label="Name"
                  id="name"
                  type="text"
                  value={name}
                  placeholder="Enter character name"
                  required
                  onChange={(event) =>
                    setName(event.target.value)
                  }
                />

                <FormInput
                  label="Nickname"
                  id="nickname"
                  type="text"
                  value={nickname}
                  placeholder="Enter nickname"
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
                  placeholder="Enter title"
                  onChange={(event) =>
                    setTitle(event.target.value)
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
                      Number(event.target.value),
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
                    value={primaryRace}
                    onChange={(event) =>
                      setPrimaryRace(
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
                  value={characterLevel}
                  min={1}
                  onChange={(event) =>
                    setCharacterLevel(
                      Number(event.target.value),
                    )
                  }
                />
              </div>
            </section>

            <section>
              <h2 className="mb-2 text-xl font-bold text-gray-800">
                Primary Statistics
              </h2>

              <p className="mb-4 text-sm text-gray-600">
                Each statistic must be between 1
                and 14.
              </p>

              <div className="grid gap-4 md:grid-cols-3">
                <FormInput
                  label="Strength"
                  id="strength"
                  type="number"
                  value={strength}
                  min={1}
                  max={14}
                  onChange={(event) =>
                    setStrength(
                      Number(event.target.value),
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
                      Number(event.target.value),
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
                      Number(event.target.value),
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
                  value={mind}
                  min={1}
                  max={14}
                  onChange={(event) =>
                    setMind(
                      Number(event.target.value),
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
                      Number(event.target.value),
                    )
                  }
                />
              </div>
            </section>

            {message && (
              <p
                className="rounded-md bg-red-50 px-4 py-3 text-sm text-red-700"
                role="alert"
              >
                {message}
              </p>
            )}

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() =>
                  navigate("/dashboard")
                }
                className="w-full rounded-md bg-gray-600 py-3 font-semibold text-white transition hover:bg-gray-700"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={calculateCharacter}
                disabled={isSaving}
                className="w-full rounded-md bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
              >
                {isSaving
                  ? "Creating Character..."
                  : "Create Character"}
              </button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default CharacterCreationPage;
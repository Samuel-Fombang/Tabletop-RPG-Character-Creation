import { useNavigate } from "react-router-dom";

import type { CharacterData } from "../types/character";

type CharacterCardProps = {
  character: CharacterData;
};

function CharacterCard({
  character,
}: CharacterCardProps) {
  const navigate = useNavigate();

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
      (character.currentHp / safeMaxHp) * 100,
      0,
    ),
    100,
  );

  const initial =
    character.name
      .trim()
      .charAt(0)
      .toUpperCase() || "?";

  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-purple-950 p-5 text-white">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-amber-400 bg-slate-800 text-2xl font-bold text-amber-300 shadow">
              {initial}
            </div>

            <div>
              <h2 className="text-xl font-bold">
                {character.name}
              </h2>

              {character.nickname && (
                <p className="mt-1 text-sm italic text-purple-200">
                  “{character.nickname}”
                </p>
              )}

              {character.title && (
                <p className="mt-1 text-sm text-slate-300">
                  {character.title}
                </p>
              )}
            </div>
          </div>

          <span className="rounded-full bg-amber-400 px-3 py-1 text-xs font-bold text-slate-950">
            Level {level}
          </span>
        </div>
      </div>

      <div className="p-5">
        <div className="mb-5 flex items-center justify-between">
          <span className="rounded-full bg-purple-100 px-3 py-1 text-sm font-semibold text-purple-700">
            {race}
          </span>

          <span className="text-sm font-medium text-slate-500">
            Age {character.age}
          </span>
        </div>

        <div className="mb-5">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="font-semibold text-slate-700">
              Hit Points
            </span>

            <span className="font-bold text-red-600">
              {character.currentHp}/
              {character.maxHp}
            </span>
          </div>

          <div className="h-3 overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-red-500 transition-all duration-500"
              style={{
                width: `${hpPercentage}%`,
              }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-slate-50 p-3">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Strength
            </p>

            <p className="mt-1 text-xl font-bold text-slate-900">
              {character.strength}
            </p>
          </div>

          <div className="rounded-xl bg-slate-50 p-3">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Dexterity
            </p>

            <p className="mt-1 text-xl font-bold text-slate-900">
              {character.dexterity}
            </p>
          </div>

          <div className="rounded-xl bg-slate-50 p-3">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Initiative
            </p>

            <p className="mt-1 text-xl font-bold text-indigo-700">
              {character.initiative}
            </p>
          </div>

          <div className="rounded-xl bg-slate-50 p-3">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Action Points
            </p>

            <p className="mt-1 text-xl font-bold text-purple-700">
              {character.actionPoints}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() =>
            navigate(
              `/character/details/${character.id}`,
            )
          }
          className="mt-5 w-full rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white transition hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-200"
        >
          View Character
        </button>
      </div>
    </article>
  );
}

export default CharacterCard;
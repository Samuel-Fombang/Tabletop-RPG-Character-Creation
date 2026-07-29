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

  return (
    <div className="mb-6 rounded-xl border bg-white p-6 shadow-md transition hover:shadow-lg">
      <h2 className="text-2xl font-bold text-slate-800">
        {character.name}
      </h2>

      {character.nickname && (
        <p className="italic text-gray-500">
          "{character.nickname}"
        </p>
      )}

      <div className="mt-4 grid grid-cols-2 gap-3 text-gray-700">
        <p>
          <strong>Race:</strong> {race}
        </p>

        <p>
          <strong>Level:</strong> {level}
        </p>

        <p>
          <strong>HP:</strong>{" "}
          {character.currentHp}/{character.maxHp}
        </p>

        <p>
          <strong>Initiative:</strong>{" "}
          {character.initiative}
        </p>
      </div>

      <button
        className="mt-6 rounded-lg bg-blue-600 px-5 py-2 font-semibold text-white transition hover:bg-blue-700"
        onClick={() =>
          navigate(
            `/character/details/${character.id}`
          )
        }
      >
        View Character
      </button>
    </div>
  );
}

export default CharacterCard;
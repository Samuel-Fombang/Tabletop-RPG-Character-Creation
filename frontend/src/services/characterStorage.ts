import type { CharacterData } from "../types/character";

const CHARACTERS_KEY = "characters";
const CURRENT_CHARACTER_KEY = "character";

export function getCharacters(): CharacterData[] {
  const savedCharacters =
    localStorage.getItem(CHARACTERS_KEY);

  if (!savedCharacters) {
    return [];
  }

  try {
    const characters =
      JSON.parse(savedCharacters) as CharacterData[];

    if (!Array.isArray(characters)) {
      return [];
    }

    return characters;
  } catch (error) {
    console.error(
      "Unable to read saved characters:",
      error,
    );

    return [];
  }
}

export function saveCharacters(
  characters: CharacterData[],
): void {
  localStorage.setItem(
    CHARACTERS_KEY,
    JSON.stringify(characters),
  );
}

export function saveCharacter(
  character: CharacterData,
): void {
  const characters = getCharacters();

  const characterIndex = characters.findIndex(
    (savedCharacter) =>
      savedCharacter.id === character.id,
  );

  if (characterIndex >= 0) {
    characters[characterIndex] = character;
  } else {
    characters.push(character);
  }

  saveCharacters(characters);

  localStorage.setItem(
    CURRENT_CHARACTER_KEY,
    JSON.stringify(character),
  );
}

export function getCharacterById(
  id: string,
): CharacterData | undefined {
  const characters = getCharacters();

  return characters.find(
    (character) => character.id === id,
  );
}

export function deleteCharacter(
  id: string,
): void {
  const characters = getCharacters();

  const remainingCharacters = characters.filter(
    (character) => character.id !== id,
  );

  saveCharacters(remainingCharacters);

  const savedCurrentCharacter =
    localStorage.getItem(CURRENT_CHARACTER_KEY);

  if (!savedCurrentCharacter) {
    return;
  }

  try {
    const currentCharacter =
      JSON.parse(
        savedCurrentCharacter,
      ) as CharacterData;

    if (currentCharacter.id === id) {
      localStorage.removeItem(
        CURRENT_CHARACTER_KEY,
      );
    }
  } catch (error) {
    console.error(
      "Unable to read current character:",
      error,
    );

    localStorage.removeItem(
      CURRENT_CHARACTER_KEY,
    );
  }
}
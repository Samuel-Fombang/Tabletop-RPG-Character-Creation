export type CharacterData = {
  id: string;
  ownerEmail: string;

  name: string;
  nickname?: string;
  title?: string;
  age: number;

  primaryRace?: string;
  race?: string;

  characterLevel?: number;
  level?: number;

  strength: number;
  dexterity: number;
  constitution: number;
  mind: number;
  attunement: number;

  maxHp: number;
  currentHp: number;
  actionPoints: number;
  initiative: number;
};
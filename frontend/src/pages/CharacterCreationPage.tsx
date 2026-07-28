import { useState } from "react";

function CharacterCreationPage() {
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [title, setTitle] = useState("");
  const [age, setAge] = useState(18);
  const [primaryRace, setPrimaryRace] = useState("Human");
  const [characterLevel, setCharacterLevel] = useState(1);

  const [strength, setStrength] = useState(1);
  const [dexterity, setDexterity] = useState(1);
  const [constitution, setConstitution] = useState(1);

  const [mind, setMind] = useState(1);
  const [attunement, setAttunement] = useState(1);

  const [maxHp, setMaxHp] = useState<number | null>(null);
  const [currentHp, setCurrentHp] = useState<number | null>(null);
  const [actionPoints, setActionPoints] = useState<number | null>(null);
  const [initiative, setInitiative] = useState<number | null>(null);

  async function calculateCharacter() {
    try {
      const response = await fetch(
        "http://localhost:5089/api/character/calculate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            nickname,
            title,
            age,
            primaryRace,
            characterLevel,
            strength,
            dexterity,
            constitution,
            mind,
            attunement,
          }),
        }
      );

      if (!response.ok) {
        alert("Failed to calculate character.");
        return;
      }

      const data = await response.json();

      setMaxHp(data.maxHp);
      setCurrentHp(data.currentHp);
      setActionPoints(data.actionPoints);
      setInitiative(data.initiative);
    } catch (error) {
      console.error(error);
      alert("Cannot connect to the backend.");
    }
  }

  return (
    <div style={{ maxWidth: "700px", margin: "30px auto", padding: "20px" }}>
      <h1>Create Your Character</h1>

      <hr />

      <h2>Character Information</h2>

      <p>Name</p>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <p>Nickname</p>
      <input
        type="text"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
      />

      <p>Title</p>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <p>Age</p>
      <input
        type="number"
        value={age}
        min="1"
        onChange={(e) => setAge(Number(e.target.value))}
      />

      <p>Primary Race</p>

      <select
        value={primaryRace}
        onChange={(e) => setPrimaryRace(e.target.value)}
      >
        <option value="Human">Human</option>
        <option value="Elf">Elf</option>
        <option value="Dwarf">Dwarf</option>
        <option value="Orc">Orc</option>
      </select>

      <p>Character Level</p>

      <input
        type="number"
        value={characterLevel}
        min="1"
        onChange={(e) => setCharacterLevel(Number(e.target.value))}
      />

      <hr />

      <h2>Primary Stats</h2>

      <p>Strength</p>

      <input
        type="number"
        value={strength}
        min="1"
        onChange={(e) => setStrength(Number(e.target.value))}
      />

      <p>Dexterity</p>

      <input
        type="number"
        value={dexterity}
        min="1"
        onChange={(e) => setDexterity(Number(e.target.value))}
      />

      <p>Constitution</p>

      <input
        type="number"
        value={constitution}
        min="1"
        onChange={(e) => setConstitution(Number(e.target.value))}
      />

      <hr />

      <h2>Mental Stats</h2>

      <p>Mind</p>

      <input
        type="number"
        value={mind}
        min="1"
        onChange={(e) => setMind(Number(e.target.value))}
      />

      <p>Attunement</p>

      <input
        type="number"
        value={attunement}
        min="1"
        onChange={(e) => setAttunement(Number(e.target.value))}
      />

      <hr />

      <button type="button" onClick={calculateCharacter}>
        Calculate Character
      </button>

      {maxHp !== null && (
        <div>
          <hr />

          <h2>Character Summary</h2>

          <p>Name: {name}</p>
          <p>Nickname: {nickname}</p>
          <p>Title: {title}</p>
          <p>Age: {age}</p>
          <p>Race: {primaryRace}</p>
          <p>Level: {characterLevel}</p>

          <h3>Calculated Stats</h3>

          <p>Maximum HP: {maxHp}</p>
          <p>Current HP: {currentHp}</p>
          <p>Action Points: {actionPoints}</p>
          <p>Initiative: {initiative}</p>
        </div>
      )}
    </div>
  );
}

export default CharacterCreationPage;
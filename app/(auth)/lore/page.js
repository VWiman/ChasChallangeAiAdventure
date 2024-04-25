"use client";
import { useState, useContext } from "react";
import { LoreContext } from "@/context/LoreContext";
import RaceComponent from "@/components/Race";
import ClassComponent from "@/components/Class";
import TownComponent from "@/components/Town";

export default function LorePage() {
  const { setLore } = useContext(LoreContext);
  const [name, setName] = useState("");
  const [characterClass, setCharacterClass] = useState("");
  const [race, setRace] = useState("");
  const [hometown, setHometown] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !characterClass || !race || !hometown) {
      setError("All fields need to be filled in");
      return;
    }
    setLore({ name, characterClass, race, hometown });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
				
        <button type="submit">Submit</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </>
  );
}

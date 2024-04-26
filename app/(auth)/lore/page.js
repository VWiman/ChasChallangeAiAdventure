"use client";

import { useState } from "react";
import { useLore } from "@/context/LoreContext";
import RaceComponent from "@/components/Race";
import ClassComponent from "@/components/Class";
import TownComponent from "@/components/Town";

export default function LorePage() {
  const {
    name,
    setName,
    characterClass,
    setCharacterClass,
    race,
    setRace,
    hometown,
    setHometown,
    setLore,
  } = useLore();
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !characterClass || !race || !hometown) {
      setError("All fields need to be filled in");
      return;
    }
    setLore({ name, characterClass, race, hometown });
    // Reset alla fält?
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
        <RaceComponent />
        <ClassComponent />
        <TownComponent />
        <button type="submit">Submit</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </>
  );
}

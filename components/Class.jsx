"use client";

import { useContext } from "react";
import { LoreContext } from "@/context/LoreContext";
import Dropdown from "@/components/Dropdown";
import ButtonWithTooltip from "@/components/ButtonWithToolTip";

const ClassComponent = () => {
  const { characterClass, setCharacterClass } = useContext(LoreContext);  // Using context to manage state

  const handleSelect = (value) => {
    setCharacterClass(value);  // Update context directly
  };

  return (
    <div className="comps">
      <div>
        <Dropdown
          options={[
            "Bard", "Wizard", "Monk", "Barbarian", "Druid", "Rogue"  // Updated 'Dragonborn' to 'Rogue' for accuracy
          ]}
          onSelect={handleSelect}
          value={characterClass}  // Set the current value from context
        />
        <p>Class: {characterClass}</p>
      </div>

      <div>
        <ButtonWithTooltip
          tooltipText={
            <div style={{ maxWidth: "400px" }}>
              <p>Bard:<br />Bards channel their power through song, speech, or performance to cast spells.</p>
              <p>Wizard:<br />Wizards channel magic through their extensive knowledge of the arcane.</p>
              <p>Monk:<br />Monks are unarmed combatants capable of spending Ki Points to perform special abilities.</p>
              <p>Barbarian:<br />Barbarians use their martial prowess and primal rage in combat.</p>
              <p>Druid:<br />Druids utilize the power of nature to cast spells and transform into various creatures.</p>
              <p>Rogue:<br />Rogues rely on stealth and resourcefulness in challenging situations.</p>
            </div>
          }
        />
      </div>
    </div>
  );
};

export default ClassComponent;


"use client";

import { useState } from "react";
import Dropdown from "@/components/Dropdown";
import ButtonWithTooltip from "@/components/ButtonWithToolTip";

const ClassComponent = () => {
  const [selectedValue, setSelectedValue] = useState("");

  const handleSelect = (value) => {
    setSelectedValue(value);
  };

  return (
    <div className="comps">
      <div>
        <Dropdown
          options={[
            "Bard",
            "Wizard",
            "Monk",
            "Barbarian",
            "Druid",
            "Dragonborn",
          ]}
          onSelect={handleSelect}
        />
        <p>Class: {selectedValue}</p>
      </div>

      <div>
        <ButtonWithTooltip
          tooltipText={
            <div style={{ maxWidth: "400px" }}>
              {" "}
              {/* Adjust the maxWidth to your desired width */}
              <p>
                Bard:
                <br />
                Bards channel their power through song, speech, or performance
                to cast spells.
              </p>
              <p>
                Wizard:
                <br />
                Wizards channel magic through their extensive knowledge of the
                arcane to fight enemies and aid allies in combat.
              </p>
              <p>
                Monk:
                <br />
                Monks are unarmed combatants capable of spending Ki Points to
                perform special abilities.
              </p>
              <p>
                Barbarian:
                <br />
                Barbarians use their martial prowess and primal rage to
                strengthen themselves and dominate enemies in combat.
              </p>
              <p>
                Druid:
                <br />
                Druids are closely attuned with nature and the animals that live
                in it. They utilize the power of nature to cast spells and have
                the ability to transform into various creatures.
              </p>
              <p>
                Rogue:
                <br />
                Rogues are well versed in the art of stealth and rely on their
                resourcefulness to be in control of any challenging situation.
              </p>
            </div>
          }
        />
      </div>
    </div>
  );
};

export default ClassComponent;

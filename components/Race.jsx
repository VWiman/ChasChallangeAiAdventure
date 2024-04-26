"use client";

import { useLore } from "@/context/LoreContext";
import Dropdown from "@/components/Dropdown";
import ButtonWithTooltip from "@/components/ButtonWithToolTip";

const RaceComponent = () => {
  const { race, setRace } = useLore();

  const handleSelect = (value) => {
    setRace(value);
  };

  return (
    <div className="comps">
      <div>
        <Dropdown
          options={[
            "Human", "Tiefling", "Githyanki", "Half-Orc", "Gnome", "Dragonborn"
          ]}
          onSelect={handleSelect}
          value={race}
        />
        <p>Race: {race}</p>
      </div>

      <div>
        <ButtonWithTooltip
          buttonText="Hover over me"
          tooltipText={
            <div style={{ maxWidth: "400px" }}>
              {" "}
              {/* Adjust the maxWidth to your desired width */}
              <p>
                Human:
                <br />
                Humans boast remarkable versatility and adaptability, excelling
                in various classes and roles due to their balanced abilities and
                potential for diverse specialization.
              </p>
              <p>
                Tiefling:
                <br />
                Tieflings, descendants of fiends, possess innate infernal powers
                and resilience, making them formidable and versatile individuals
                despite facing societal prejudice.
              </p>
              <p>
                Githyanki:
                <br />
                Githyanki exhibit exceptional physical prowess and formidable
                psionic abilities, honed over generations in the Astral Plane,
                making them formidable warriors and adept users of psychic
                magic.
              </p>
              <p>
                Half-Orc:
                <br />
                Half-orcs possess unparalleled strength and resilience,
                combining the ferocity of orcs with the adaptability of humans,
                making them formidable warriors and tenacious survivors.
              </p>
              <p>
                Gnome:
                <br />
                Gnomes are renowned for their ingenuity, curiosity, and affinity
                for magic, making them exceptional inventors, cunning
                tricksters, and powerful spellcasters.
              </p>
              <p>
                Dragonborn:
                <br />
                Dragonborn wield the strength and majesty of dragons, possessing
                breath weapons and resilient scales, making them fearsome
                warriors and leaders on the battlefield.
              </p>
            </div>
          }
        />
      </div>
    </div>
  );
};

export default RaceComponent;

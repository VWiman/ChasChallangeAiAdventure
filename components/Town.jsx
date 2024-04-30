"use client";

import { useLore } from "@/context/LoreContext";
import Dropdown from "@/components/Dropdown";
import ButtonWithTooltip from "@/components/ButtonWithToolTip";

const TownComponent = () => {
  const { hometown, setHometown } = useLore();

  const handleSelect = (value) => {
    setHometown(value);
  };

  return (
    <div className="flex items-center gap-2 my-2">
      <div className="w-4/5"> 
        <label className="inline-flex flex-col w-full">
					<span className="text-gray-600">Select Town</span>
          <Dropdown
            options={[
              "Eldorium",
              "Verdant Haven",
              "Vaporia",
              "Marinath",
              "Aetherius",
              "Arcanum",
            ]}
            onSelect={handleSelect}
            value={hometown}
            />
        </label>
        <p className="text-gray-600">Selected Town: {hometown}</p>
      </div>

      <div>
        <ButtonWithTooltip
          buttonText="Hover over me"
          tooltipText={
            <div style={{ maxWidth: "400px" }}>
              <p>
                Eldorium:
                <br />A city ablaze with ambition and innovation, its towering
                spires reflecting the fiery determination of its people.
              </p>
              <p>
                Verdant Haven:
                <br />A tranquil sanctuary nestled within ancient forests, where
                magic and nature intertwine in harmony.
              </p>
              <p>
                Vaporia:
                <br />A city veiled in perpetual mist and powered by arcane
                steam, stands as a testament to innovation and ingenuity amidst
                a landscape of swirling gears and shimmering copper spires.
              </p>
              <p>
                Marinath:
                <br />A coastal city where sea and sky meet, shaping a culture
                of maritime exploration and tradition.
              </p>
              <p>
                Aetherius:
                <br />A city of serene heights and spiritual wisdom, where the
                wind's gentle touch guides the way.
              </p>
              <p>
                Arcanum:
                <br />A city where arcane knowledge and protection intertwine
                amidst its mystical streets.
              </p>
            </div>
          }
        />
      </div>
    </div>
  );
};

export default TownComponent;
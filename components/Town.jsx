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
            options={["Stoneholm", "Pineview", "Marinport"]}
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
                Stoneholm:
                <br />
                The crisp mountain air of Stoneholm whispers secrets of
                adventure.
              </p>
              <p>
                Pineview:
                <br />A tranquil sanctuary nestled within ancient forests.
              </p>
              <p>
                Marinport:
                <br />A small harbor perfect for seafaring quests and trading
                riches.
              </p>
            </div>
          }
        />
      </div>
    </div>
  );
};

export default TownComponent;

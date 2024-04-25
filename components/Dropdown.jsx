"use client";

import { useState } from "react";

const Dropdown = ({ options, onSelect }) => {
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleSelect = (option) => {
    setSelectedOption(option);
    if (onSelect) {
      onSelect(option);
    }
  };

  return (
    <select
      value={selectedOption}
      onChange={(e) => handleSelect(e.target.value)}
    >
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;

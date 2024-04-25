"use client";

import { useState } from "react";
import { FaQuestionCircle } from "react-icons/fa";

const ButtonWithToolTip = ({ tooltipText }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const toggleTooltip = () => {
    setShowTooltip(!showTooltip);
  };

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <FaQuestionCircle
        onMouseEnter={toggleTooltip}
        onMouseLeave={toggleTooltip}
        style={{ cursor: "pointer", color: "#888" }}
      />
      {showTooltip && (
        <div
          style={{
            position: "absolute",
            top: "1270%",
            left: "150%",
            transform: "translateY(-50%)",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            color: "#fff",
            height: 500,
            width: 400,
            padding: "4px 8px",
            borderRadius: "4px",
            fontSize: "14px",
            zIndex: "1000",
          }}
        >
          {tooltipText}
        </div>
      )}
    </div>
  );
};

export default ButtonWithToolTip;

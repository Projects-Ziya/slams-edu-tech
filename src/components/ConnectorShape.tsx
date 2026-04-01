import React from "react";

const ConnectorShape: React.FC = () => {
  return (
    <svg
      className="
        absolute
        left-[-70px]
        top-[-50px]
        w-[1200px]
        h-[320px]
        pointer-events-none
      "
      viewBox="0 0 1200 500"
      fill="none"
    >
      <path
        d="
          M 0 40
          H 820
          L 900 140
          V 340
          H 1180
          V 270
          H 1050
          V 495
          H 1200
          
        "
        stroke="#6B7280"
        strokeWidth="1.5"
        strokeDasharray="4 6"
      />

      {/* end dot */}
      <circle
        cx="1200"
        cy="495"
        r="4"
        fill="#6B7280"
      />
    </svg>
  );
};

export default ConnectorShape;
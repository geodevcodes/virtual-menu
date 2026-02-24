import React from "react";

const PdfIcon = () => {
  return (
    <svg
      width="25"
      height="25"
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <rect width="25" height="25" fill="url(#pattern0_622_1281)" />
      <defs>
        <pattern
          id="pattern0_622_1281"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use xlinkHref="#image0_622_1281" transform="scale(0.01)" />
        </pattern>
        <image
          id="image0_622_1281"
          width="100"
          height="100"
          preserveAspectRatio="none"
          xlinkHref="data:image/png;base64,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"
        />
      </defs>
    </svg>
  );
};

export default PdfIcon;

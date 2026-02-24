import React from "react";
import { FiArrowLeft } from "react-icons/fi";

const Left = () => {
  return (
    <div className="flex items-center gap-1">
      <FiArrowLeft />
      <p>Previous</p>
    </div>
  );
};

export default Left;

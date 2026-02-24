import React from "react";
import { BsDot } from "react-icons/bs";

const tipsList = [
  {
    id: 1,
    title: "File size",
    description: "PDFs under 1MB load fastest on mobile devices",
  },
  {
    id: 2,
    title: "Formats",
    description: "Supported file types are PDF, JPG, and PNG.",
  },
  {
    id: 3,
    title: "Naming",
    description: "Use clear menu names like “Breakfast” or “Dinner Specials.”",
  },
  {
    id: 4,
    title: "Updating",
    description: "You can replace a menu file anytime - QR codes stay linked.",
  },
  {
    id: 5,
    title: "Readability",
    description: "Use text that’s at least 12pt for easy reading on mobile.",
  },
];

const TipsList = () => {
  return (
    <div className="bg-white border border-[#E4E7EC] rounded-[8px] w-full shadow absolute top-12 lg:left-[73%]">
      <ul className="lg:p-4 md:p-3 p-2 flex flex-col gap-3">
        {tipsList.map((tip) => (
          <div key={tip.id} className="flex gap-2">
            <BsDot className="mt-1" />
            <li className="">
              <h4 className="font-semibold text-sm lg:text-base">
                {tip.title}
              </h4>
              <p className="lg:text-sm text-xs text-[#6B7280]">
                {tip.description}
              </p>
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default TipsList;

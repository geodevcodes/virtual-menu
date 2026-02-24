"use client";

import { CutleryIcon, DrinksIcon } from "@/assets";
import dynamic from "next/dynamic";
import Image from "next/image";
import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";

const PDFViewer = dynamic(() => import("../../../reusable/PDFViewer"), {
  ssr: false,
});

type RestaurantViewProps = {
  goBack: () => void;
  drink?: string;
  food?: string;
};

const RestaurantView = ({ goBack, drink, food }: RestaurantViewProps) => {
  const [selectedView, setSelectedView] = useState(() => {
    if (food) return 1;
    if (drink) return 2;
    return 1;
  });
  // console.log("drink & food", drink, food);
  const isFoodPdf = food?.toLowerCase().endsWith(".pdf");
  const isDrinkPdf = drink?.toLowerCase().endsWith(".pdf");

  return (
    <div className="p-2 md:p-4 lg:p-8 flex flex-col gap-8 w-full overflow-x-hidden">
      <div className="flex flex-col gap-3 md:gap-4 w-full">
        <div className="flex items-center w-full text-[#FCFCFD]">
          <button onClick={goBack} className="cursor-pointer">
            <FaArrowLeft />
          </button>
          <h1 className="lg:text-[30px] md:text-[25px] text-xl text-center flex-1">
            Welcome to Clear Essence
          </h1>
        </div>
        <div className="w-full bg-[#F0ECEB] rounded-[8px]">
          <div className="p-1 flex items-center text-xs md:text-sm lg:text-base">
            {food && (
              <button
                onClick={() => setSelectedView(1)}
                className={`${
                  selectedView === 1
                    ? "bg-[#5C2E1B] rounded-[8px] text-[#F0ECEB]"
                    : "bg-transparent"
                } flex items-center gap-1 w-full justify-center py-1.5 md:py-2 lg:py-2.5 cursor-pointer`}
              >
                <p>Food</p>
                <CutleryIcon
                  fill={selectedView === 1 ? "#F0ECEB" : "#475467"}
                />
              </button>
            )}
            {drink && (
              <button
                onClick={() => setSelectedView(2)}
                className={`${
                  selectedView === 2
                    ? "bg-[#5C2E1B] rounded-[8px] text-[#F0ECEB]"
                    : "bg-transparent"
                } flex items-center gap-1 w-full justify-center py-1.5 md:py-2 lg:py-2.5 cursor-pointer`}
              >
                <p>Drink</p>
                <DrinksIcon fill={selectedView === 2 ? "#F0ECEB" : "#475467"} />
              </button>
            )}
          </div>
        </div>
      </div>

      {selectedView === 1 && (
        <div className="flex flex-col items-center justify-center min-h-screen bg-transparent text-center">
          {food ? (
            <div
              className="relative w-full h-screen overflow-x-hidden overflow-y-auto touch-pan-x touch-pan-y"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              {isFoodPdf ? (
                <PDFViewer fileUrl={food} />
              ) : (
                <div className="inline-block">
                  <Image
                    src={food}
                    alt="Food photo"
                    width={1000}
                    height={1000}
                    sizes="100vw"
                    className="max-w-full object-contain md:w-full md:h-full"
                    placeholder="blur"
                    blurDataURL="/blur-bg.jpeg"
                    loading="lazy"
                  />
                </div>
              )}
            </div>
          ) : (
            <p className="text-gray-500 animate-pulse">
              No menu item available
            </p>
          )}
        </div>
      )}

      {selectedView === 2 && (
        <div className="flex flex-col items-center justify-center min-h-screen bg-transparent text-center">
          {drink ? (
            <div
              className="relative w-full h-screen overflow-x-hidden overflow-y-auto touch-pan-x touch-pan-y"
              style={{
                WebkitOverflowScrolling: "touch",
              }}
            >
              {isDrinkPdf ? (
                <PDFViewer fileUrl={drink} />
              ) : (
                <div className="inline-block">
                  <Image
                    src={drink}
                    alt={`Drink photo`}
                    width={1000}
                    height={1000}
                    sizes="100vw"
                    className="max-w-full object-contain md:w-full md:h-full"
                    placeholder="blur"
                    blurDataURL="/blur-bg.jpeg"
                    loading="lazy"
                  />
                </div>
              )}
            </div>
          ) : (
            <p className="text-gray-500 animate-pulse">
              No menu item available
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default RestaurantView;

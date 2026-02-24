"use client";

import { HotelIcon } from "@/assets";
import dynamic from "next/dynamic";
import Image from "next/image";
import React from "react";
import { FaArrowLeft } from "react-icons/fa";

const PDFViewer = dynamic(() => import("../../../reusable/PDFViewer"), {
  ssr: false,
});

type AccommodationViewProps = {
  goBack: () => void;
  accommodation?: string;
};

const AccommodationView = ({
  goBack,
  accommodation,
}: AccommodationViewProps) => {
  const isAccommodationPdf = accommodation?.toLowerCase().endsWith(".pdf");

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

        <button className="w-full rounded-[8px] border-[3px] lg:border-4 border-[#F0ECEB] cursor-pointer">
          <div className="w-full rounded-[8px] bg-[#5C2E1B] py-1.5 md:py-2 lg:py-2.5 flex items-center justify-center gap-1">
            <p className="text-[#FCFCFD]">Accommodation</p>
            <HotelIcon fill={"#F0ECEB"} />
          </div>
        </button>
      </div>

      <div className="flex flex-col items-center justify-center min-h-screen bg-transparent text-center">
        {accommodation ? (
          <div
            className="relative w-full h-screen overflow-x-hidden overflow-y-auto touch-pan-x touch-pan-y"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {isAccommodationPdf ? (
              <PDFViewer fileUrl={accommodation} />
            ) : (
              <div className="inline-block">
                <Image
                  src={accommodation}
                  alt="Spa photo"
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
          <p className="text-gray-500 animate-pulse">No menu photo available</p>
        )}
      </div>
    </div>
  );
};

export default AccommodationView;

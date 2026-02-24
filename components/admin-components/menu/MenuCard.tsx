import { CutleryIcon, DrinksIcon, HotelIcon, PdfIcon, SpaIcon } from "@/assets";
import { MenuCardProps } from "@/types/menuType";
import Image from "next/image";
import React, { useState } from "react";
import { BsDot } from "react-icons/bs";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import { format } from "date-fns";

const MenuCard = ({
  setShowEditMenu,
  setShowPreviewMenu,
  setShowDeleteMenu,
  setShowQRMenu,
  setMenuName,
  setMenuId,
  setMenuDetails,
  ...data
}: MenuCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  // console.log("data res:", data);

  const menuFiles = [
    data?.foodMenuFile,
    data?.drinkMenuFile,
    data?.spaMenuFile,
    data?.accomodationMenuFile,
  ].filter(Boolean);
  const fileCount = menuFiles.length;
  // const allPDF = menuFiles.every((file) => file.toLowerCase().endsWith(".pdf"));
  const onePDF = fileCount === 1 && menuFiles[0].toLowerCase().endsWith(".pdf");
  const mixedFiles = fileCount > 1;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`w-full md:w-56 lg:w-64 xl:w-[16.5rem] 2xl:w-full rounded-[12px] bg-[#FBFAF9] border border-[#E4E7EC] hover:shadow-xl hover:bg-[#5F3F3205] hover:border-[#5F3F3299] hover:border-dashed cursor-pointer shadow overflow-auto`}
    >
      <div className="p-2.5 md:p-3 lg:p-4 flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              {data?.foodMenuFile && (
                <div
                  className={`${
                    isHovered
                      ? "bg-[#5C2E1B] text-white"
                      : "border border-[#5C2E1B] bg-transparent"
                  } rounded-[8px] p-1 h-[24px] w-[24px]`}
                >
                  <CutleryIcon fill={isHovered ? "white" : "#5C2E1B"} />
                </div>
              )}
              {data?.drinkMenuFile && (
                <div
                  className={`${
                    isHovered
                      ? "bg-[#5C2E1B] text-white"
                      : "border border-[#5C2E1B] bg-transparent"
                  } rounded-[8px] p-1 h-[24px] w-[24px]`}
                >
                  <DrinksIcon fill={isHovered ? "white" : "#5C2E1B"} />
                </div>
              )}
              {data?.spaMenuFile && (
                <div
                  className={`${
                    isHovered
                      ? "bg-[#5C2E1B] text-white"
                      : "border border-[#5C2E1B] bg-transparent"
                  } rounded-[8px] p-1 h-[24px] w-[24px]`}
                >
                  <SpaIcon fill={isHovered ? "white" : "#5C2E1B"} />
                </div>
              )}
              {data?.accomodationMenuFile && (
                <div
                  className={`${
                    isHovered
                      ? "bg-[#5C2E1B] text-white"
                      : "border border-[#5C2E1B] bg-transparent"
                  } rounded-[8px] p-1 h-[24px] w-[24px]`}
                >
                  <HotelIcon fill={isHovered ? "white" : "#5C2E1B"} />
                </div>
              )}
            </div>

            <button
              onClick={() => {
                setShowDeleteMenu?.(true);
                setMenuName?.(data.name);
                setMenuId?.(data.id);
              }}
              className="hover:text-red-500 text-[#667085] rounded-full cursor-pointer"
            >
              <RiDeleteBinLine size={35} className="p-2" />
            </button>
          </div>
          <p className="text-[14px] font-medium text-[#101828]">{data?.name}</p>
          <div className="flex items-center gap-0.5 text-[12px] text-[#667085]">
            {mixedFiles ? (
              <p>Mixed files</p>
            ) : onePDF ? (
              <PdfIcon />
            ) : menuFiles[0] ? (
              <div className="border border-[#E2E8F0] rounded-[8px]">
                <Image
                  src={menuFiles[0]}
                  alt="menu-image"
                  width={100}
                  height={100}
                  className="w-[30px] h-[30px] object-cover rounded-md"
                />
              </div>
            ) : (
              <p>No File</p>
            )}
            <BsDot />
            <p>{format(new Date(data?.createdAt), "d MMMM, yyyy")}</p>
            <BsDot />
            {/* <p>{data?.fileSize}</p> */}
          </div>
        </div>

        <div className="flex items-center gap-1 justify-between text-[14px]">
          <button
            onClick={() => {
              setMenuId?.(data?.id);
              setShowPreviewMenu?.(true);
            }}
            className="flex items-center gap-1.5 lg:w-[83px] hover:bg-[#5F3F3214] hover:border-[#5C2E1B] border border-[#E2E8F0] p-1.5 rounded-[8px] text-[#404652] cursor-pointer"
          >
            <MdOutlineRemoveRedEye />
            <p>View</p>
          </button>
          <button
            onClick={() => {
              setMenuId?.(data?.id);
              setShowEditMenu?.(true);
            }}
            className="flex items-center gap-1.5 lg:w-[83px] hover:bg-[#5F3F3214] hover:border-[#5C2E1B] border border-[#E2E8F0] p-1.5 rounded-[8px] text-[#404652] cursor-pointer"
          >
            <FaRegEdit />
            <p>Edit</p>
          </button>
          <button
            onClick={() => {
              setShowQRMenu?.(true);
              setMenuDetails?.(data);
            }}
            className="bg-[#5C2E1B] p-1 md:p-1.5 lg:p-2 text-white rounded-[8px] cursor-pointer"
          >
            QR
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuCard;

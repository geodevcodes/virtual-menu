"use client";
import { MenuSkeleton } from "@/components/skeletons/MenuSkeleton";
import { useGetMenus } from "@/services/menu/menuService";
import React, { useEffect, useRef, useState } from "react";
import { Modal } from "@/components/modals/Modal";
import { useDebounce } from "@/hooks/useDebounce";
import CreateMenu from "./create-menu/CreateMenu";
import { NoMenuBg, NoMenuIcon } from "@/assets";
import { MenuResponse } from "@/types/menuType";
import { CiSearch } from "react-icons/ci";
import { IoMdAdd } from "react-icons/io";
import { Range } from "react-date-range";
import { format } from "date-fns";
import FilledMenu from "./FilledMenu";
import TipsList from "./TipsList";

const Menu = () => {
  const [showCreateMenu, setShowCreateMenu] = useState<boolean>(false);
  const [displayTips, setDisplayTips] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm);
  const [page, setPage] = useState(1);
  const take = 8;
  const skip = (page - 1) * take;
  const [openDate, setOpenDate] = useState(false);
  const calendarRef = useRef<HTMLDivElement | null>(null);
  const [range, setRange] = useState<Range[]>([
    {
      startDate: undefined,
      endDate: undefined,
      key: "selection",
    },
  ]);
  const { data, isLoading } = useGetMenus();
  const [menuData, setMenuData] = useState<MenuResponse | null>(null);
  console.log("data:=====", data);

  useEffect(() => {
    if (data) {
      setMenuData(data);
    }
  }, [data]);

  return (
    <>
      <div className="w-full flex flex-col gap-[32px]">
        <div className="w-full xl:h-[80px] border-b-2 border-[#F0ECEB]">
          <div className="flex items-center flex-wrap justify-between gap-[24px] mb-[24px] xl:mb-0">
            <div className="flex flex-col gap-1">
              <h1 className="text-lg md:text-xl lg:text-2xl font-semibold text-[#101828]">
                Menus
              </h1>
              <p className="text-sm text-[#667085]">
                Upload a PDF or image of your menu. We’ll generate a menu link
                and QR code automatically.
              </p>
            </div>

            <div className="flex items-center gap-2 bg-[#fff] border border-[#D0D5DD] rounded-[8px] max-w-[268px] w-full">
              <CiSearch className="ml-3" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search menu here"
                className="bg-transparent outline-none py-2.5 w-full rounded-[8px] placeholder:textSecondary text-[#15171C] text-[14px]"
              />
            </div>
          </div>
        </div>

        {!debouncedSearchTerm &&
        !range[0].startDate &&
        !range[0].endDate &&
        (!menuData ||
          (Array.isArray(menuData.data) && menuData.data.length === 0)) ? (
          isLoading ? (
            <MenuSkeleton />
          ) : (
            <div className="border border-[#E4E7EC] py-2 lg:py-0 lg:h-[250px] rounded-[8px] w-full flex flex-col gap-3 lg:gap-5 items-center">
              <div className="relative mt-8">
                <NoMenuBg className="" />
                <NoMenuIcon className="absolute top-0 left-16" />
              </div>
              <div className="flex flex-col items-center">
                <h2 className="text-[#101828] text-[10px] md:text-[14px] lg:text-[16px]">
                  No Menus Yet
                </h2>
                <p className="text-[8px] md:text-[10px] lg:text-[12px] text-[#667085] text-center px-4">
                  Upload your PDF or image menus and they’ll be instantly
                  available via QR codes. Max size: 10MB
                </p>
              </div>

              <div className="flex items-center gap-4 font-medium relative">
                <button
                  onClick={() => setShowCreateMenu(true)}
                  className="bg-[#5C2E1B] text-white rounded-[8px] lg:w-[220px] px-3 py-2 text-xs md:text-sm lg:text-[16px] flex items-center gap-2 cursor-pointer"
                >
                  <IoMdAdd />
                  <p>Upload my first menu</p>
                </button>
                <button
                  onMouseEnter={() => setDisplayTips(true)}
                  onMouseLeave={() => setDisplayTips(false)}
                  className="bg-[#F9FAFB] border border-[#E2E8F0] lg:w-[87px] text-[#404652] rounded-[8px] px-3 py-2 text-xs md:text-sm lg:text-[16px] cursor-pointer"
                >
                  Tips
                </button>

                {displayTips && <TipsList />}
              </div>
            </div>
          )
        ) : (
          menuData && (
            <FilledMenu
              data={menuData}
              debouncedSearchTerm={debouncedSearchTerm}
              isLoading={isLoading}
              page={page}
              take={take}
              setPage={setPage}
              openDate={openDate}
              setOpenDate={setOpenDate}
              calendarRef={calendarRef}
              range={range}
              setRange={setRange}
            />
          )
        )}
      </div>
      <Modal show={showCreateMenu} onClose={() => setShowCreateMenu(false)}>
        <CreateMenu setShowCreateMenu={setShowCreateMenu} />
      </Modal>
    </>
  );
};

export default Menu;

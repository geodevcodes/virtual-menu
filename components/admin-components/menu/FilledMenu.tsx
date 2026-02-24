import { MenuSkeleton } from "@/components/skeletons/MenuSkeleton";
import Right from "@/components/pagination-arrows/Right";
import Left from "@/components/pagination-arrows/Left";
import { FilledMenuProps } from "@/types/menuType";
import { Modal } from "@/components/modals/Modal";
import CreateMenu from "./create-menu/CreateMenu";
import { NoMenuBg, NoMenuIcon } from "@/assets";
import { FiUploadCloud } from "react-icons/fi";
import ReactPaginate from "react-paginate";
import React, { useEffect, useRef, useState } from "react";
import { DateRange, Range } from "react-date-range";
import DeleteMenu from "./DeleteMenu";
import dynamic from "next/dynamic";
import MenuCard from "./MenuCard";
import QrMenu from "./QrMenu";
import { format } from "date-fns";
import { LuCalendarDays } from "react-icons/lu";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import FilterMenuSkeleton from "@/components/skeletons/FilterMenuSkeleton";

const PreviewMenu = dynamic(() => import("./PreviewMenu"), {
  ssr: false,
  loading: () => <div>Loading preview...</div>,
});

const EditMenu = dynamic(() => import("./edit-menu/EditMenu"), {
  ssr: false,
  loading: () => <div>Loading preview...</div>,
});

const FilledMenu = ({
  data,
  debouncedSearchTerm,
  isLoading,
  setPage,
  take,
  page,
  openDate,
  setOpenDate,
  calendarRef,
  range,
  setRange,
}: FilledMenuProps) => {
  const [showPreviewMenu, setShowPreviewMenu] = useState<boolean>(false);
  const [showCreateMenu, setShowCreateMenu] = useState<boolean>(false);
  const [showDeleteMenu, setShowDeleteMenu] = useState<boolean>(false);
  const [showEditMenu, setShowEditMenu] = useState<boolean>(false);
  const [showQRMenu, setShowQRMenu] = useState<boolean>(false);
  const [menuDetails, setMenuDetails] = useState<any>(null);
  const [menuId, setMenuId] = useState<string>("");
  const [menuName, setMenuName] = useState("");
  // const [openDate, setOpenDate] = useState(false);
  // const calendarRef = useRef<HTMLDivElement | null>(null);
  // const [range, setRange] = useState<Range[]>([
  //   {
  //     startDate: undefined,
  //     endDate: undefined,
  //     key: "selection",
  //   },
  // ]);

  const rows = data?.data ?? [];
  const totalCount = data?.meta?.total ?? 0;
  const pageCount = Math.ceil(totalCount / take);

  const handlePageClick = (event: any) => {
    setPage(event.selected + 1);
  };

  //   hide date on ESC press
  const hideOnEscape = (e: any) => {
    if (e.key === "Escape") {
      setOpenDate(false);
    }
  };

  //   hide date on click outside
  const hideOnClickOutside = (e: any) => {
    if (calendarRef.current && !calendarRef.current.contains(e.target)) {
      setOpenDate(false);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", hideOnEscape, true);
    document.addEventListener("click", hideOnClickOutside, true);
  }, []);

  const handleDateRange = (item: any) => {
    setRange([item.selection]);
    setPage(1);
    if (
      item.selection.startDate &&
      item.selection.endDate &&
      item.selection.startDate !== item.selection.endDate
    ) {
      setOpenDate(false);
    } else {
      setOpenDate(true);
      // Fetch menu based on the selected date range
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-4 lg:gap-6">
        <div className="border border-[#E4E7EC] py-2 lg:py-0 lg:h-[146px] rounded-[8px] w-full">
          <div className="p-2 md:p-2.5 lg:p-3 flex flex-col gap-1.5 md:gap-2 lg:gap-3 items-center">
            <button className="bg-[#F2F4F7] border border-[#F9FAFB] rounded-full hover:bg-[#F2F4F7]/60 cursor-pointer">
              <FiUploadCloud size={50} color="#475467" className="p-3" />
            </button>
            <div className="flex flex-col gap-1 items-center justify-center">
              <div className="text-xs md:text-[14px] flex items-center gap-1">
                <button
                  onClick={() => setShowCreateMenu(true)}
                  className="text-[#5C2E1B] cursor-pointer hover:underline"
                >
                  Click to upload
                </button>
              </div>
              <p className="text-[#667085] text-[10px] md:text-[11px] lg:text-[12px]">
                Upload your PDF or image menus and they’ll be instantly
                available via QR codes. Max size: 10MB
              </p>
            </div>
          </div>
        </div>

        {/* filled menu */}
        <div className="flex flex-col gap-4 md:gap-6 lg:gap-8 w-full">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 lg:gap-3">
              <h1 className="text-[#101828] lg:text-[24px] md:text-[20px] text-[16px] font-semibold">
                My Menu
              </h1>
              <div className="bg-[#F3ECE9] rounded-[6px] border border-[#CEBFBA] flex items-center justify-center">
                <p className="text-[8px] md:text-[11px] lg:text-[12px] text-[#5C2E1B] p-1">
                  {rows.length}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 relative border border-gray-200 rounded-lg text-xs lg:text-sm max-w-[239px] w-full">
              <div className="flex items-center gap-1.5 lg:gap-2 px-2.5 w-full">
                <LuCalendarDays size={20} color="#8A91A6" />
                <input
                  type="text"
                  onClick={() => setOpenDate(true)}
                  value={`${
                    range[0].startDate
                      ? format(range[0].startDate, "d MMM, yyyy")
                      : "Select Dates"
                  } ${range[0].endDate ? "-" : ""} ${
                    range[0].endDate
                      ? format(range[0].endDate, "d MMM, yyyy")
                      : ""
                  } `}
                  placeholder="Select date"
                  readOnly
                  className="h-full py-2 xl:py-2.5 outline-none cursor-pointer w-full flex-1"
                />
              </div>
              {openDate && (
                <div
                  ref={calendarRef}
                  className="absolute z-10 right-0 top-11 border border-gray-200 rounded-md shadow bg-white w-[320px] sm:w-[400px] md:w-auto"
                >
                  <DateRange
                    editableDateInputs={true}
                    onChange={handleDateRange}
                    moveRangeOnFirstSelection={false}
                    ranges={range}
                    rangeColors={["#5c2e1b"]}
                    months={window.innerWidth < 640 ? 1 : 2}
                    direction={
                      window.innerWidth < 640 ? "vertical" : "horizontal"
                    }
                  />
                  <button
                    onClick={() => {
                      setRange([
                        {
                          startDate: undefined,
                          endDate: undefined,
                          key: "selection",
                        },
                      ]);
                      setOpenDate(false);
                    }}
                    className="mx-2 mb-2 cursor-pointer hover:opacity-70 rounded-[8px] bg-[#5C2E1B] text-white px-4 py-1 md:py-1.5"
                  >
                    Reset
                  </button>
                </div>
              )}
            </div>
          </div>

          {isLoading ? (
            <FilterMenuSkeleton />
          ) : (debouncedSearchTerm || range[0].endDate) && rows.length <= 0 ? (
            <div className="border border-[#E4E7EC] py-2 lg:py-0 lg:h-[250px] rounded-[8px] w-full flex flex-col gap-3 lg:gap-5 items-center">
              <div className="relative mt-8">
                <NoMenuBg className="" />
                <NoMenuIcon className="absolute top-0 left-16" />
              </div>
              <div className="flex flex-col items-center">
                <h2 className="text-[#101828] text-[10px] md:text-[14px] lg:text-[16px]">
                  No Menus Found
                </h2>
                <p className="text-[8px] md:text-[10px] lg:text-[12px] text-[#667085] text-center px-4">
                  We couldn’t find any menus matching your search or filter
                  criteria. Please try adjusting your search terms or filters.
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-5 overflow-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4 lg:gap-5 xl:gap-6 2xl:gap-8">
                {rows?.map((menu: any) => (
                  <MenuCard
                    key={menu.id}
                    {...menu}
                    setShowEditMenu={setShowEditMenu}
                    setShowPreviewMenu={setShowPreviewMenu}
                    setShowDeleteMenu={setShowDeleteMenu}
                    setShowQRMenu={setShowQRMenu}
                    setMenuName={setMenuName}
                    setMenuId={setMenuId}
                    setMenuDetails={setMenuDetails}
                  />
                ))}
              </div>

              <ReactPaginate
                breakLabel="..."
                nextLabel={<Right />}
                onPageChange={handlePageClick}
                pageCount={pageCount}
                previousLabel={<Left />}
                containerClassName="paginationContainer"
                activeClassName="paginationActive"
                pageClassName="eachElem"
                previousLinkClassName="prevBtnClass"
                nextLinkClassName="nexBtnClass"
                renderOnZeroPageCount={null}
                nextClassName={
                  isLoading ? "pointer-events-none opacity-50" : ""
                }
                previousClassName={
                  isLoading ? "pointer-events-none opacity-50" : ""
                }
                forcePage={page - 1}
              />
            </div>
          )}
        </div>
      </div>

      {/* ======= MODALS ======= */}
      <Modal show={showCreateMenu} onClose={() => setShowCreateMenu(false)}>
        <CreateMenu setShowCreateMenu={setShowCreateMenu} />
      </Modal>
      <Modal show={showEditMenu} onClose={() => setShowEditMenu(false)}>
        <EditMenu setShowEditMenu={setShowEditMenu} menuId={menuId} />
      </Modal>
      <Modal show={showPreviewMenu} onClose={() => setShowPreviewMenu(false)}>
        <PreviewMenu setShowPreviewMenu={setShowPreviewMenu} menuId={menuId} />
      </Modal>
      <Modal show={showQRMenu} onClose={() => setShowQRMenu(false)}>
        <QrMenu closeQR={() => setShowQRMenu(false)} menuData={menuDetails} />
      </Modal>
      <Modal show={showDeleteMenu} onClose={() => setShowDeleteMenu(false)}>
        <DeleteMenu
          cancelDelete={() => setShowDeleteMenu(false)}
          menuItem={menuName}
          menuItemId={menuId}
        />
      </Modal>
    </>
  );
};

export default FilledMenu;

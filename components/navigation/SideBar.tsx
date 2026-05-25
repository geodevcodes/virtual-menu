"use client";
import { SideBarLinks } from "@/lib/links";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { FiLogOut } from "react-icons/fi";
import { MdMoreVert } from "react-icons/md";
import { TbSettings } from "react-icons/tb";
import { Modal } from "../modals/Modal";
import Logout from "../auth-components/logout/Logout";
import { useUserProfile } from "@/services/settings/settingsService";
import { avatarPlaceholderUrlOne } from "@/lib/utils";

const dropdownItems = [
  {
    id: 1,
    title: "Settings",
    path: "/settings",
    icon: <TbSettings />,
  },
  {
    id: 3,
    title: "Log out",
    icon: <FiLogOut />,
  },
];

const SideBar = () => {
  const pathname = usePathname();
  const [showDropdown, setShowDropdown] = useState(false);
  const [logout, setLogout] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const { data: userProfileData, isLoading, isError } = useUserProfile();

  // console.log("profile data:", userProfileData);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Cleanup
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  return (
    <>
      <div className="bg-white border-r-2 border-[#F0ECEB] hidden lg:flex flex-col justify-between max-w-[300px] lg:w-[220px] xl:w-[260px] 2xl:w-[280px] h-screen">
        <div className="flex flex-col mt-[18px] md:mt-[20px] lg:mt-[22px] gap-[28px] md:gap-[30px] lg:gap-[30px] px-2 md:px-4 lg:px-6">
          <div className="flex items-center gap-2 md:gap-3 lg:gap-4">
            <div className="w-[40px] h-[40px] bg-[#F0ECEB] flex items-center justify-center rounded-full">
              <p className="text-sm lg:text-base text-[#5C2E1B]">CE</p>
            </div>
            <div className="flex flex-col lg:gap-0.5">
              <p className="text-[8px] md:text-[10px] lg:text-[12px] text-[#667085]">
                Virtual Menu
              </p>
              <p className="text-[10px] md:text-[12px] lg:text-[14px] text-[#101828]">
                Virtual Menu
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-1 md:gap-2 lg:gap-3">
            {SideBarLinks.map((link) => (
              <Link
                href={link.path}
                key={link.id}
                className={`${
                  pathname.includes(link.path)
                    ? "bg-[#5C2E1B] rounded-md"
                    : "bg-white"
                } text-[12px] lg:text-[14px]`}
              >
                <div className="flex items-center gap-1.5 md:gap-2 lg:gap-3 py-2 px-2.5">
                  {
                    <link.icon
                      stroke={
                        pathname.includes(link.path) ? "white" : "#98A2B3"
                      }
                    />
                  }
                  <p
                    className={`${
                      pathname.includes(link.path)
                        ? "text-white font-medium"
                        : "text-[#98A2B3] font-semibold"
                    }`}
                  >
                    {link.title}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="px-2 md:px-4 lg:px-6 border-t-2 border-[#F0ECEB]">
          <div className="flex items-center justify-between py-2.5 md:py-3.5 lg:py-5">
            <div className="flex items-center gap-1 md:gap-2 lg:gap-3 w-full">
              <div className="rounded-full w-[40px] h-[40px] flex items-center justify-center">
                <Image
                  src={
                    userProfileData?.businessProfile?.logoUrl
                      ? userProfileData.businessProfile.logoUrl
                      : avatarPlaceholderUrlOne
                  }
                  alt="User Avatar"
                  width={500}
                  height={500}
                  className="rounded-full w-full h-full object-cover"
                />
              </div>
              {isLoading ? (
                <p className="text-[10px] md:text-[12px] lg:text-[14px] text-[#101828]">
                  Loading...
                </p>
              ) : isError ? (
                <p className="text-[10px] md:text-[12px] lg:text-[14px] text-[#101828]">
                  Error loading profile
                </p>
              ) : (
                <div className="flex flex-col">
                  <p className="text-[10px] md:text-[12px] lg:text-[14px] text-[#101828] truncate max-w-[10ch]">
                    {userProfileData?.fullName || "User Name"}
                  </p>
                  <p className="text-[8px] md:text-[10px] lg:text-[12px] text-[#667085] truncate max-w-[14ch]">
                    {userProfileData?.email || "useremail@example.com"}
                  </p>
                </div>
              )}
            </div>
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="cursor-pointer"
            >
              <MdMoreVert size={20} color="#475467" />
            </button>
          </div>
        </div>
        {/* drop down menu */}
        {showDropdown && (
          <div
            ref={dropdownRef}
            className="absolute lg:left-[216px] xl:left-[228px] 2xl:left-[250px] bottom-4 z-10 mt-2 w-48 bg-white border border-[#F0ECEB] rounded-md shadow-lg"
          >
            <div className="flex items-center gap-1 md:gap-1.5 lg:gap-2 w-full px-3 py-2">
              <div className="rounded-full w-[40px] h-[40px] flex items-center justify-center">
                <Image
                  src={
                    userProfileData?.businessProfile?.logoUrl
                      ? userProfileData.businessProfile.logoUrl
                      : avatarPlaceholderUrlOne
                  }
                  alt="User Avatar"
                  width={500}
                  height={500}
                  className="rounded-full w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <p className="text-[8px] md:text-[10px] lg:text-[12px] text-[#101828] truncate max-w-[10ch]">
                  {userProfileData?.fullName || "User Name"}
                </p>
                <p className="text-[7px] md:text-[9px] lg:text-[10px] text-[#667085] truncate max-w-[14ch]">
                  {userProfileData?.email || "useremail@example.com"}
                </p>
              </div>
            </div>
            <ul className="py-1">
              {dropdownItems.map((item) => (
                <li
                  key={item.id}
                  onClick={() => {
                    if (item.id === 3) {
                      setLogout(true);
                      setShowDropdown(false);
                    } else if (item.path) {
                      router.push(item.path);
                      setShowDropdown(false);
                    }
                  }}
                  className={`${
                    item.id === 3 ? "text-[#B42318]" : "text-[#101828]"
                  } ${
                    item.id === 3 ? "border-0" : "border-y border-[#F0ECEB]"
                  } px-3 py-2 text-sm text-[#101828] hover:bg-[#F2F4F7] flex items-center gap-2 cursor-pointer`}
                >
                  {item.icon}
                  {item.title}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <Modal show={logout} onClose={() => setLogout(false)}>
        <Logout onCancel={() => setLogout(false)} />
      </Modal>
    </>
  );
};

export default SideBar;

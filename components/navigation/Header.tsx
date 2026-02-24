"use client";
import Logo from "@/assets/Logo";
import React, { useState } from "react";
import { RiMenu2Line } from "react-icons/ri";
import { motion, AnimatePresence } from "framer-motion";
import { SideBarLinks } from "@/lib/links";
import { usePathname, useRouter } from "next/navigation";
import { CgCloseR } from "react-icons/cg";
import Image from "next/image";
import { FiLogOut } from "react-icons/fi";
import { Modal } from "../modals/Modal";
import Logout from "../auth-components/logout/Logout";
import { useUserProfile } from "@/services/settings/settingsService";
import { TbSettings } from "react-icons/tb";

type HeaderProps = {
  openMenu: boolean;
  setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
};

const Header = ({ openMenu, setOpenMenu }: HeaderProps) => {
  const [logout, setLogout] = useState(false);
  const navigate = useRouter();
  const pathname = usePathname();
  const { data: userProfileData, isLoading, isError } = useUserProfile();

  return (
    <div className="flex bg-white w-full h-[60px] lg:hidden border-b-2 border-[#F0ECEB] shadow-2xs">
      <div className="flex items-center justify-between px-4 w-full">
        <Logo />

        <button onClick={() => setOpenMenu(true)}>
          <RiMenu2Line size={24} color="#667085" />
        </button>
      </div>
      <AnimatePresence>
        {openMenu && (
          <motion.section
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", duration: 2 }}
            style={{ backgroundColor: "#fff" }}
            className="fixed left-0 w-60 h-[100vh] top-0 flex flex-col justify-between z-10 rounded-r-[20px] overflow-y-auto"
          >
            <div className="flex flex-col gap-3">
              <CgCloseR
                onClick={() => setOpenMenu(false)}
                size={28}
                color="#98A2B3"
                className="flex items-center self-end mt-1 mr-3"
              />

              <div className="flex flex-col gap-4 px-4 text-xs">
                {SideBarLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={(e) => {
                      e.preventDefault();
                      setOpenMenu(false);
                      setTimeout(() => {
                        navigate.push(link.path);
                      }, 500);
                    }}
                    className={`${
                      pathname.includes(link.path)
                        ? "bg-[#5C2E1B] rounded-md"
                        : "bg-white border-y"
                    } text-[12px] lg:text-[14px]`}
                  >
                    <div className="flex items-center gap-1.5 py-2 px-2.5">
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
                  </button>
                ))}
              </div>
            </div>

            <div className="px-2 md:px-4 lg:px-6 border-t-2 border-[#F0ECEB] flex flex-col gap-1.5 py-2">
              <div className="flex items-center gap-1 md:gap-2 lg:gap-3 w-full">
                <div className="rounded-full w-[30px] h-[30px] flex items-center justify-center">
                  <Image
                    src={
                      userProfileData?.businessProfile?.logoUrl
                        ? userProfileData.businessProfile.logoUrl
                        : "/blur-bg.jpeg"
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
                  <div className="flex flex-col truncate">
                    <p className="text-[10px] md:text-[12px] lg:text-[14px] text-[#101828]">
                      {userProfileData?.name || "User Name"}
                    </p>
                    <p className="text-[8px] md:text-[10px] lg:text-[12px] text-[#667085] truncate">
                      {userProfileData?.email || "useremail@example.com"}
                    </p>
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <button
                  onClick={() => {
                    navigate.push("/settings");
                    setOpenMenu(false);
                  }}
                  className="flex items-center gap-2 text-sm text-[#344054] border-y border-[#F0ECEB] py-1"
                >
                  <TbSettings />
                  <p>Settings</p>
                </button>
                <button
                  onClick={() => {
                    setLogout(true);
                    setOpenMenu(false);
                  }}
                  className="flex items-center gap-2 text-sm text-[#B42318]"
                >
                  <FiLogOut />
                  <p>Log out</p>
                </button>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
      <Modal show={logout} onClose={() => setLogout(false)}>
        <Logout onCancel={() => setLogout(false)} />
      </Modal>
    </div>
  );
};

export default Header;

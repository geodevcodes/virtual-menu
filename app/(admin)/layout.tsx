"use client";
import Header from "@/components/navigation/Header";
import SideBar from "@/components/navigation/SideBar";
import React, { useState } from "react";

const AdminLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <div className="flex w-full h-screen">
      {openMenu && (
        <div
          className="fixed inset-0 bg-black/50 z-10 lg:hidden"
          onClick={() => setOpenMenu(false)}
        />
      )}
      <SideBar />
      <div className="flex flex-col w-full h-full">
        <Header openMenu={openMenu} setOpenMenu={setOpenMenu} />
        <div className="bg-[#ffffff] h-full w-full p-2 md:py-[15px] md:px-[18px] lg:px-5 xl:px-6 lg:py-5 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;

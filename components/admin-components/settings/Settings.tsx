"use client";
import SelectButton from "@/components/reusable/SelectButton";
import ChangePassword from "./ChangePassword";
import { useState } from "react";
import Profile from "./Profile";


const tabs = [
  { id: 1, title: "Profile" },
  { id: 2, title: "Password" },
  { id: 3, title: "Team 48" },
  { id: 4, title: "Plan" },
  { id: 5, title: "Billing" },
  { id: 6, title: "Customize" },
];

const Settings = () => {
  const [selectedTab, setSelectedTab] = useState(1);

  return (
    <div className="mt-2 lg:mt-0 flex flex-col gap-3.5 lg:gap-4 text-[12px] md:text-[13px] lg:text-[14px] w-full">
      <h1 className="lg:text-[30px] text-[20px] md:text-[25px] text-[#101828]">
        Settings
      </h1>
      <div className="hidden md:flex items-center gap-[20px]">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedTab(tab.id)}
            className={`${
              selectedTab === tab.id
                ? "text-[#5C2E1B] bg-[#F0ECEB] border border-[#5C2E1B] rounded-[6px]"
                : "text-[#667085] hover:underline"
            } px-3 py-1 lg:py-1.5 cursor-pointer`}
          >
            {tab.title}
          </button>
        ))}
      </div>
      {/* mobile */}
      <div className="md:hidden block w-full">
        <SelectButton
          title={"select"}
          options={tabs.map((tab) => tab.title)}
          width="100%"
          onChange={(value) => {
            const foundTab = tabs.find((tab) => tab.title === value);
            if (foundTab) setSelectedTab(foundTab.id);
          }}
          value={tabs.find((tab) => tab.id === selectedTab)?.title}
        />
      </div>
      {selectedTab === 1 && <Profile />}
      {selectedTab === 2 && <ChangePassword />}
    </div>
  );
};

export default Settings;

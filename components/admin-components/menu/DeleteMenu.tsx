import { useDeleteMenu } from "@/services/menu/menuService";
import React from "react";
import { RiErrorWarningLine } from "react-icons/ri";

interface DeleteMenuProps {
  cancelDelete: () => void;
  menuItem: string;
  menuItemId: string;
}

const DeleteMenu = ({
  cancelDelete,
  menuItem,
  menuItemId,
}: DeleteMenuProps) => {
  console.log("menu id=", menuItemId, menuItem);
  const { mutate: deleteMenu, isPending } = useDeleteMenu();

  const handleDelete = () => {
    deleteMenu(menuItemId, {
      onSuccess: () => {
        cancelDelete();
      },
    });
  };

  return (
    <div className="bg-white p-5 md:p-6 rounded-3xl w-[80vw] md:w-[50vw] lg:w-[26rem] 2xl:w-[28rem] text-black">
      <div className="flex flex-col gap-8">
        <div className="bg-[#FEF3F2] p-2 md:p-2.5 xl:p-3 w-fit rounded-full mx-auto">
          <div className="bg-[#FEE4E2] p-2 md:p-2.5 xl:p-3 rounded-full">
            <RiErrorWarningLine
              color="#DE3024"
              className="w-5 h-5 md:w-8 md:h-8 xl:w-10 xl:h-10"
            />
          </div>
        </div>
        <div className="flex flex-col items-center gap-3">
          <h1 className="text-[#101828] text-base md:text-lg lg:text-2xl 2xl:text-3xl">
            Delete menu
          </h1>
          <p className="text-[#667085] text-[12px] md:text-sm lg:text-base text-center">
            Are you sure you want to delete the{" "}
            <span className="font-medium text-[#101828]">'{menuItem}'</span>
            <br />
            menu?
          </p>
          <p className="text-[#667085] text-[12px] md:text-sm lg:text-base text-center">
            This action will remove the menu and its QR link.
          </p>
        </div>

        <div className="flex item-center justify-center gap-4">
          <button
            onClick={cancelDelete}
            className="bg-[#F9FAFB] border border-[#D0D5DD] text-[#344054] rounded-lg lg:w-[170px] px-4 py-2 mr-2 text-sm xl:text-base cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="bg-[#B42318] text-white rounded-lg lg:w-[170px] px-4 py-2 text-sm xl:text-base cursor-pointer"
          >
            {isPending ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteMenu;

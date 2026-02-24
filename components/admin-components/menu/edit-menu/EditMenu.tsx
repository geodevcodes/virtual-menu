"use client";
import {
  useDeleteFileMenu,
  useGetMenu,
  useUpdateMenu,
} from "@/services/menu/menuService";
import { FileImage, FileText, X } from "lucide-react";
import { yupResolver } from "@hookform/resolvers/yup";
import { EditMenuProps } from "@/types/menuType";
import { editMenuSchema } from "../menuSchema";
import RestaurantMenus from "./RestaurantMenus";
import { getFileTypeFromUrl } from "@/lib/lib";
import { useState, useEffect } from "react";
import Accommodation from "./Accommodation";
import { useForm } from "react-hook-form";
import SpaMenu from "./SpaMenu";

export default function EditMenu({ setShowEditMenu, menuId }: EditMenuProps) {
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, any>>({});
  const [isRestaurantOpen, setIsRestaurantOpen] = useState(true);
  const [filesToDelete, setFilesToDelete] = useState<string[]>([]);
  const [isSpaOpen, setIsSpaOpen] = useState(true);
  const [isAccommodationOpen, setIsAccommodationOpen] = useState(true);

  // Get Menu by ID
  const { data: menuResponse } = useGetMenu(menuId);
  const menu = menuResponse?.data;

  // Update Menu mutation
  const { mutate: updateMenu, isPending } = useUpdateMenu();

  // Delete File in a Menu
  const { mutate: deleteFileMenu } = useDeleteFileMenu();

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
  } = useForm({
    resolver: yupResolver(editMenuSchema),
    mode: "onChange",
  });

  const handleFileDrop = (acceptedFiles: File[], categoryId: string) => {
    const file = acceptedFiles[0];
    if (!file) return;

    const fileData = {
      file,
      name: file.name,
      size: (file.size / 1024).toFixed(0) + " KB",
      type: file.type,
      progress: 0,
    };

    setUploadedFiles((prev) => ({ ...prev, [categoryId]: fileData }));

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadedFiles((prev) => {
        const current = prev[categoryId];
        if (!current || current.progress >= 100) {
          clearInterval(interval);
          return prev;
        }
        return {
          ...prev,
          [categoryId]: {
            ...current,
            progress: Math.min(current.progress + 10, 100),
          },
        };
      });
    }, 100);
  };

  const handleDelete = (categoryId: string) => {
    // Mark this file category for deletion on submit
    setFilesToDelete((prev) => [...prev, categoryId]);

    // Remove from UI
    setUploadedFiles((prev) => {
      const updated = { ...prev };
      delete updated[categoryId];
      return updated;
    });
  };

  const getFileIcon = (type: string) => {
    return type?.includes("pdf") ? (
      <div className=" bg-[#FFF8F5] p-2 w-fit rounded-full flex items-center justify-center">
        <div className="bg-[#FFF3EB] p-2 rounded-full flex items-center justify-center">
          <FileText className="size-4 text-[#5C2E1B]" />
        </div>
      </div>
    ) : (
      <div className="bg-[#FFF8F5] p-2 w-fit rounded-full flex items-center justify-center">
        <div className="bg-[#FFF3EB] p-2 rounded-full flex items-center justify-center">
          <FileImage className="size-4 text-[#5C2E1B]" />
        </div>
      </div>
    );
  };

  // Prepopulate data when menu data loads
  useEffect(() => {
    if (menu) {
      setValue("menuName", menu.name || "");
      setValue("restaurantReviewLinkUrl", menu.restaurantReviewUrl || "", {
        shouldValidate: true,
      });
      setValue("accommodationReviewLinkUrl", menu.accomodationReviewUrl || "", {
        shouldValidate: true,
      });
      setValue("spaReviewLinkUrl", menu.spaReviewUrl || "", {
        shouldValidate: true,
      });

      const extractFilename = (url: string) => {
        try {
          return url.split("/").pop()?.split("?")[0] || "File";
        } catch {
          return "File";
        }
      };

      // Pre-populate uploaded files if they exist in the menu data
      const files: Record<string, any> = {};

      // Check for food menu file
      if (menu.foodMenuFile) {
        files.foodMenuFile = {
          name: extractFilename(menu.foodMenuFile),
          size: menu.foodMenuFile.size
            ? (menu.foodMenuFile.size / 1024).toFixed(0) + " KB"
            : "",
          type: getFileTypeFromUrl(menu.foodMenuFile),
          progress: 100,
          url: menu.foodMenuFile,
        };
      }

      // Check for drink menu file
      if (menu.drinkMenuFile) {
        files.drinkMenuFile = {
          name: extractFilename(menu.drinkMenuFile),
          size: menu.drinkMenuFile.size
            ? (menu.drinkMenuFile.size / 1024).toFixed(0) + " KB"
            : "",
          type: getFileTypeFromUrl(menu.drinkMenuFile),
          progress: 100,
          url: menu.drinkMenuFile,
        };
      }

      // Check for spa menu file
      if (menu.spaMenuFile) {
        files.spaMenuFile = {
          name: extractFilename(menu.spaMenuFile),
          size: menu.spaMenuFile.size
            ? (menu.spaMenuFile.size / 1024).toFixed(0) + " KB"
            : "",
          type: getFileTypeFromUrl(menu.spaMenuFile),
          progress: 100,
          url: menu.spaMenuFile,
        };
      }

      // Check for Accommodation menu file
      if (menu.accomodationMenuFile) {
        files.accomodationMenuFile = {
          name: extractFilename(menu.accomodationMenuFile),
          size: menu.accomodationMenuFile.size
            ? (menu.accomodationMenuFile.size / 1024).toFixed(0) + " KB"
            : "",
          type: getFileTypeFromUrl(menu.accomodationMenuFile),
          progress: 100,
          url: menu.accomodationMenuFile,
        };
      }

      if (Object.keys(files).length > 0) {
        setUploadedFiles(files);
      }
    }
  }, [menu, setValue]);

  const onSubmit = (data: any) => {
    const formData = new FormData();
    formData.append("name", data.menuName);
    formData.append("restaurantReviewUrl", data.restaurantReviewLinkUrl);
    formData.append("spaReviewUrl", data.spaReviewLinkUrl);
    formData.append("accomodationReviewUrl", data.accommodationReviewLinkUrl);

    // Include all uploaded files
    Object.entries(uploadedFiles).forEach(([categoryId, fileData]) => {
      if (fileData.file) {
        formData.append(`${categoryId}`, fileData.file);
      }
    });

    // If files were flagged for deletion,
    // delete them BEFORE updating the menu
    if (filesToDelete.length > 0) {
      filesToDelete.forEach((categoryId) => {
        deleteFileMenu({ menuId, menuFile: categoryId });
      });
    }

    updateMenu(
      { formData, menuId },
      {
        onSuccess: () => {
          setShowEditMenu?.(false);
        },
      }
    );
  };

  const isFormValid = isValid && Object.keys(uploadedFiles).length > 0;

  return (
    <section className="bg-white min-w-[90vw] sm:min-w-[500px] md:min-w-[600px] lg:min-w-[700px] lg:max-w-[500px] p-6 lg:px-10 rounded-xl shadow-lg">
      <header className="mb-6 pb-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900 truncate max-w-[24ch]">
            Edit '{menu?.name}'
          </h2>
          <button
            onClick={() => setShowEditMenu?.(false)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            type="button"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        <p className="text-base text-gray-600 mt-3">
          Update your menu details or replace uploaded files. Existing QR codes
          automatically reflect your latest changes.
        </p>
      </header>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* <======== Menu Name =======> */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Menu Name
          </label>
          <input
            {...register("menuName")}
            type="text"
            placeholder="Enter menu name"
            className={`w-full py-3 px-4 text-sm text-[#667085] rounded-lg border bg-white ${
              errors.menuName ? "border-red-500" : "border-gray-300"
            } outline-none`}
          />
          {errors.menuName && (
            <p className="text-red-500 text-xs mt-1">
              {errors.menuName.message}
            </p>
          )}
        </div>

        {/* <======== Upload Menu ========> */}
        {/* Restaurant Menus (collapsible) */}
        <RestaurantMenus
          register={register}
          errors={errors}
          uploadedFiles={uploadedFiles}
          handleFileDrop={handleFileDrop}
          handleDelete={handleDelete}
          getFileIcon={getFileIcon}
          isRestaurantOpen={isRestaurantOpen}
          setIsRestaurantOpen={setIsRestaurantOpen}
        />

        {/* Spa Menus (collapsible) */}
        <SpaMenu
          register={register}
          errors={errors}
          uploadedFiles={uploadedFiles}
          handleFileDrop={handleFileDrop}
          handleDelete={handleDelete}
          getFileIcon={getFileIcon}
          isSpaOpen={isSpaOpen}
          setIsSpaOpen={setIsSpaOpen}
        />

        {/* Accommodation (collapsible) */}
        <Accommodation
          register={register}
          errors={errors}
          uploadedFiles={uploadedFiles}
          handleFileDrop={handleFileDrop}
          handleDelete={handleDelete}
          getFileIcon={getFileIcon}
          isAccommodationOpen={isAccommodationOpen}
          setIsAccommodationOpen={setIsAccommodationOpen}
        />

        {/* <========== Action Buttons =========> */}
        <div className="grid grid-cols-2 gap-4 pt-2">
          <button
            type="button"
            onClick={() => setShowEditMenu?.(false)}
            className="w-full cursor-pointer py-3 px-6 rounded-lg text-gray-700 bg-gray-200 hover:bg-gray-300 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!isFormValid || isPending}
            className={`w-full py-3 px-6 rounded-lg text-white font-medium transition-colors ${
              isFormValid
                ? "bg-[#5C2E1B] hover:bg-[#5C2E1B]/90 cursor-pointer"
                : "bg-[#5C2E1B80] cursor-not-allowed"
            }`}
          >
            {isPending ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </section>
  );
}

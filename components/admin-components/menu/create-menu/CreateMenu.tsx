"use client";
import { X, FileText, FileImage } from "lucide-react";
import { useCreateMenu } from "@/services/menu/menuService";
import { yupResolver } from "@hookform/resolvers/yup";
import { createMenuSchema } from "../menuSchema";
import { CreateMenuProps } from "@/types/menuType";
import RestaurantMenus from "./RestaurantMenus";
import Accommodation from "./Accommodation";
import { useForm } from "react-hook-form";
import { useState } from "react";
import SpaMenu from "./SpaMenu";

export default function CreateMenu({ setShowCreateMenu }: CreateMenuProps) {
  const { mutate: createMenu, isPending } = useCreateMenu();
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, any>>({});

  // toggle states for collapsible panels
  const [isRestaurantOpen, setIsRestaurantOpen] = useState(true);
  const [isAccommodationOpen, setIsAccommodationOpen] = useState(true);
  const [isSpaOpen, setIsSpaOpen] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ resolver: yupResolver(createMenuSchema), mode: "onChange" });

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

  const onSubmit = async (data: any) => {
    const formData = new FormData();
    formData.append("name", data.menuName);
    formData.append("restaurantReviewUrl", data.restaurantReviewLinkUrl);
    formData.append("spaReviewUrl", data.spaReviewLinkUrl);
    formData.append("accomodationReviewUrl", data.accommodationReviewLinkUrl);

    // include all uploaded files
    Object.keys(uploadedFiles).forEach((key) => {
      formData.append(key, uploadedFiles[key].file);
    });

    createMenu(
      { formData },
      {
        onSuccess: () => {
          setShowCreateMenu?.(false);
        },
      }
    );
  };

  const isFormValid = isValid && Object.keys(uploadedFiles).length > 0;

  return (
    <section className="bg-white min-w-[90vw] sm:min-w-[500px] md:min-w-[600px] lg:min-w-[700px] lg:max-w-[500px] p-6 lg:px-10 rounded-xl shadow-lg">
      <header className="mb-6 pb-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Create New Menu</h2>
          <button
            onClick={() => setShowCreateMenu?.(false)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            type="button"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        <p className="text-base text-gray-600 mt-3">
          Upload single or multiple menus. We’ll generate a single QR code that
          directs customers accordingly.
        </p>
      </header>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Menu Name */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
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

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4 pt-2">
          <button
            type="button"
            onClick={() => setShowCreateMenu?.(false)}
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
            {isPending ? "Creating..." : "Create Menu"}
          </button>
        </div>
      </form>
    </section>
  );
}

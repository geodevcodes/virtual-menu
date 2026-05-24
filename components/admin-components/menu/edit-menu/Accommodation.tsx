"use client";
import { ChevronRight, Trash2, CloudUpload } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Dropzone from "react-dropzone";
import Link from "next/link";

interface AccommodationProps {
  uploadedFiles: Record<string, any>;
  handleFileDrop: (acceptedFiles: File[], categoryId: string) => void;
  handleDelete: (categoryId: string) => void;
  getFileIcon: (type: string) => any;
  isAccommodationOpen: boolean;
  setIsAccommodationOpen: React.Dispatch<React.SetStateAction<boolean>>;
  register: any;
  errors: any;
}

export default function Accommodation({
  uploadedFiles,
  handleFileDrop,
  handleDelete,
  getFileIcon,
  isAccommodationOpen,
  setIsAccommodationOpen,
  register,
  errors,
}: AccommodationProps) {
  const accommodationCategories = [
    { id: "accommodationMenuFile", label: "Accommodation" },
  ];

  const collapseVariants = {
    open: { height: "auto", opacity: 1 },
    collapsed: { height: 0, opacity: 0 },
  };

  return (
    <div className="mb-5 border-b border-gray-100 pb-3">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-700">Accommodation</h3>
        <button
          type="button"
          onClick={() => setIsAccommodationOpen((s) => !s)}
          className="cursor-pointer p-1 rounded hover:bg-gray-100 transition-colors"
        >
          <ChevronRight
            size={18}
            className={`transform transition-transform ${
              isAccommodationOpen ? "rotate-90" : "rotate-0"
            }`}
          />
        </button>
      </div>

      <AnimatePresence initial={false}>
        {isAccommodationOpen && (
          <motion.div
            key="spa"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={collapseVariants}
            transition={{ duration: 0.25 }}
            style={{ overflow: "hidden" }}
          >
            <div className=" gap-4">
              {accommodationCategories.map((category) => {
                const file = uploadedFiles[category.id];
                return (
                  <div key={category.id}>
                    {!file ? (
                      <Dropzone
                        onDrop={(acceptedFiles) =>
                          handleFileDrop(acceptedFiles, category.id)
                        }
                        accept={{
                          "image/jpeg": [".jpg", ".jpeg"],
                          "image/png": [".png"],
                          "image/svg+xml": [".svg"],
                          "application/pdf": [".pdf"],
                        }}
                        maxSize={3072000}
                        multiple={false}
                      >
                        {({
                          getRootProps,
                          getInputProps,
                          isDragActive,
                          isDragReject,
                        }) => (
                          <div
                            {...getRootProps()}
                            className={`flex items-center justify-evenly border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
                              isDragActive && !isDragReject
                                ? "border-[#5C2E1B] bg-[#FFF8F5]"
                                : isDragReject
                                  ? "border-red-500 bg-red-50"
                                  : "border-gray-300 hover:border-gray-400"
                            }`}
                          >
                            <input {...getInputProps()} />
                            <div className="bg-[#F9FAFB] p-2 w-fit rounded-full flex items-center justify-center">
                              <div className="bg-[#F2F4F7] p-2 rounded-full flex items-center justify-center">
                                <CloudUpload className="size-5 text-[#475467]" />
                              </div>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600 mb-1">
                                {isDragActive ? (
                                  isDragReject ? (
                                    <span className="text-red-500">
                                      File type not accepted
                                    </span>
                                  ) : (
                                    <span className="text-[#5C2E1B]">
                                      Drop file here
                                    </span>
                                  )
                                ) : (
                                  <>
                                    <span className="text-[#5C2E1B] font-medium">
                                      Click
                                    </span>{" "}
                                    or drag and drop
                                  </>
                                )}
                              </p>
                              <p className="text-xs text-gray-500">
                                PDF, SVG, PNG or JPG (max. 800×400px)
                              </p>
                            </div>
                          </div>
                        )}
                      </Dropzone>
                    ) : (
                      <div className="border-1 border-[#AD968C] rounded-lg p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3 flex-1">
                            {getFileIcon(file.type)}
                            <div className="flex-1 min-w-0 max-w-[10ch]">
                              <p className="text-sm font-medium text-gray-900 truncate">
                                {file.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                {file.size}
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={() => handleDelete(category.id)}
                            className="p-1 hover:bg-gray-100 rounded transition-colors"
                          >
                            <Trash2 className="w-4 h-4 text-gray-500" />
                          </button>
                        </div>
                        <div className="space-y-2">
                          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                            <div
                              className="bg-[#5C2E1B] h-full transition-all duration-300"
                              style={{ width: `${file.progress}%` }}
                            />
                          </div>
                          <div className="flex justify-end">
                            <span className="text-xs font-medium text-gray-600">
                              {file.progress}%
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Review Link */}
            <div className="my-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Review Link
              </label>
              <input
                {...register("accommodationReviewLinkUrl")}
                type="text"
                placeholder="Add a link to receive feedback from your customers"
                className={`w-full py-3 px-4 text-sm text-[#667085] rounded-lg border bg-white ${
                  errors.accommodationReviewLinkUrl
                    ? "border-red-500"
                    : "border-gray-300"
                } outline-none`}
              />
              {errors.accommodationReviewLinkUrl && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.accommodationReviewLinkUrl.message}
                </p>
              )}
              <Link
                href="https://app.theincite360.com/en"
                target="_blank"
                rel="noopener noreferrer"
                className="w-fit text-xs mt-2 text-[#5C2E1B] hover:underline flex items-center gap-2"
              >
                Update your survey in Incite360 <ChevronRight size={16} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

import OpeningHoursSelector from "@/components/reusable/OpeningHoursSelector";
import SelectButton from "@/components/reusable/SelectButton";
import { ProfileSkeleton } from "@/components/skeletons/ProfileSkeleton";
import { formatOpeningHours } from "@/helpers/formatOpeningHours";
import {
  useUpdateUserProfile,
  useUserProfile,
} from "@/services/settings/settingsService";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { FiUploadCloud } from "react-icons/fi";

interface FormFields {
  businessName: string;
  type: string;
  phoneNumber: string;
  email: string;
  address: string;
  file: string | File | null; // ✅ allow either string or File
  openingHours: {
    timezone: string;
    open: string;
    close: string;
  };
  shortDescription: string;
}

const Profile = () => {
  const { data: userProfileData, isLoading, isError } = useUserProfile();
  const [file, setFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [editProfile, setEditProfile] = useState(false);
  const [formFields, setFormFields] = useState<FormFields>({
    businessName: "",
    type: "",
    phoneNumber: "",
    email: "",
    address: "",
    file: "",
    openingHours: {
      timezone: "Africa/Lagos",
      open: "09:00",
      close: "17:00",
    },
    shortDescription: "",
  });
  // console.log("profile data", userProfileData);
  const { mutate: updateBusinessProfile, isPending } = useUpdateUserProfile();
  const businessInfo = userProfileData?.businessProfile;

  useEffect(() => {
    if (userProfileData?.businessProfile) {
      const info = userProfileData.businessProfile;
      setFormFields({
        businessName: info.businessName || "",
        type: info.type || "",
        phoneNumber: info.phoneNumber || "",
        email: info.email || "",
        address: info.address || "",
        file: info.logoUrl || "",
        openingHours: info.openingHours || "",
        shortDescription: info.shortDesc || "",
      });
    }
  }, [userProfileData]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setFormFields((prev) => ({
        ...prev,
        file: selectedFile,
      }));
    }
  };

  const handleBrowseClick = () => {
    inputRef.current?.click();
    setEditProfile(true);
  };

  const handleBusinessProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedOpeningHours = formatOpeningHours(formFields.openingHours);
    const formData = new FormData();
    formData.append("businessName", formFields.businessName);
    formData.append("type", formFields.type);
    formData.append("phoneNumber", formFields.phoneNumber);
    formData.append("email", formFields.email);
    formData.append("address", formFields.address);
    formData.append("shortDescription", formFields.shortDescription);
    formData.append("openingHours", formattedOpeningHours);

    // ✅ append file if available
    if (formFields.file && formFields.file instanceof File) {
      formData.append("file", formFields.file);
    }

    updateBusinessProfile(formData);
    setEditProfile(false);
  };

  return (
    <>
      {isLoading || isPending ? (
        <ProfileSkeleton />
      ) : (
        <div className="mt-2 flex flex-col gap-4 overflow-y-auto">
          <div className="flex items-center w-full justify-between">
            <div className="flex flex-col gap-1">
              <h2 className="text-[#101828] text-base lg:text-[18px]">
                Profile
              </h2>
              <p className="text-[#667085] text-xs lg:text-sm">
                Update details shown to guests and on the short link preview.
              </p>
            </div>
            <button
              onClick={() => setEditProfile(true)}
              className={`${
                editProfile ? "hidden" : ""
              } bg-[#5C2E1B] text-white text-sm lg:text-base  hover:bg-[#5C2E1B]/60 cursor-pointer px-4 py-2 rounded-[8px]`}
            >
              Edit profile
            </button>
          </div>

          <form
            onSubmit={handleBusinessProfileUpdate}
            className="flex flex-col gap-4"
          >
            <div className="flex flex-col gap-2.5 mt-4">
              <div className="w-full h-[1px] bg-[#E4E7EC]" />
              <div className="flex flex-col md:grid md:grid-cols-3 md:items-center gap-2 py-1.5 md:py-2">
                <p>Business name</p>
                <input
                  type="text"
                  placeholder="Crestabel Inc"
                  readOnly={!editProfile ? true : false}
                  value={
                    !editProfile
                      ? businessInfo?.businessName ?? ""
                      : formFields.businessName
                  }
                  onChange={(e) =>
                    setFormFields((prev) => ({
                      ...prev,
                      businessName: e.target.value,
                    }))
                  }
                  className={`${
                    !editProfile ? "cursor-not-allowed" : "cursor-text"
                  } outline-0 border border-[#D0D5DD] pl-3 rounded-[8px] py-1.5 w-full md:w-[312px] lg:w-[400px]`}
                />
              </div>
              <div className="w-full h-[1px] bg-[#E4E7EC]" />
              <div className="flex flex-col md:grid md:grid-cols-3 md:items-center gap-2 py-1.5 md:py-2">
                <p>Type</p>
                <input
                  type="text"
                  placeholder="Restaurant"
                  readOnly={!editProfile ? true : false}
                  value={
                    !editProfile ? businessInfo?.type ?? "" : formFields.type
                  }
                  onChange={(e) =>
                    setFormFields((prev) => ({
                      ...prev,
                      type: e.target.value,
                    }))
                  }
                  className={`${
                    !editProfile ? "cursor-not-allowed" : "cursor-text"
                  } outline-0 border border-[#D0D5DD] pl-3 rounded-[8px] py-1.5 w-full md:w-[312px] lg:w-[400px]`}
                />
              </div>
              <div className="w-full h-[1px] bg-[#E4E7EC]" />
              <div className="flex flex-col md:grid md:grid-cols-3 md:items-center gap-2 py-1.5 md:py-2">
                <p>Phone number</p>
                <input
                  type="text"
                  placeholder="+234 700 000 0000"
                  readOnly={!editProfile ? true : false}
                  value={
                    !editProfile
                      ? businessInfo?.phoneNumber ?? ""
                      : formFields.phoneNumber
                  }
                  onChange={(e) =>
                    setFormFields((prev) => ({
                      ...prev,
                      phoneNumber: e.target.value,
                    }))
                  }
                  className={`${
                    !editProfile ? "cursor-not-allowed" : "cursor-text"
                  } outline-0 border border-[#D0D5DD] pl-3 rounded-[8px] py-1.5 w-full md:w-[312px] lg:w-[400px]`}
                />
              </div>
              <div className="w-full h-[1px] bg-[#E4E7EC]" />
              <div className="flex flex-col md:grid md:grid-cols-3 md:items-center gap-2 py-1.5 md:py-2">
                <p>Email address</p>
                <input
                  type="text"
                  placeholder="support@crestsomething.com"
                  readOnly={!editProfile ? true : false}
                  value={
                    !editProfile ? businessInfo?.email ?? "" : formFields.email
                  }
                  onChange={(e) =>
                    setFormFields((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                  className={`${
                    !editProfile ? "cursor-not-allowed" : "cursor-text"
                  } outline-0 border border-[#D0D5DD] pl-3 rounded-[8px] py-1.5 w-full md:w-[312px] lg:w-[400px]`}
                />
              </div>
              <div className="w-full h-[1px] bg-[#E4E7EC]" />
              <div className="flex flex-col md:grid md:grid-cols-3 md:items-center gap-2 py-1.5 md:py-2">
                <p className="flex flex-col">
                  Your logo
                  <span className="text-[#667085] text-xs md:text-[13px] lg:text-sm">
                    This will be displayed on your profile.
                  </span>
                </p>
                <div className="flex items-center justify-between w-full md:w-[312px] lg:w-[400px]">
                  {!formFields.file ? (
                    <div className="border border-[#E4E7EC] rounded-[8px] w-full">
                      <div className="p-2 md:p-3 lg:p-4 flex flex-col items-center gap-1 md:gap-1.5 lg:gap-2">
                        <button
                          type="button"
                          onClick={handleBrowseClick}
                          className="bg-[#F2F4F7] w-fit border border-[#F9FAFB] rounded-full hover:bg-[#F2F4F7]/60 cursor-pointer"
                        >
                          <FiUploadCloud
                            size={50}
                            color="#475467"
                            className="p-3"
                          />
                        </button>
                        <div className="flex flex-col gap-1 items-center justify-center">
                          <div className="text-xs flex items-center gap-1">
                            {file ? (
                              <p>{file.name}</p>
                            ) : (
                              <button
                                type="button"
                                onClick={handleBrowseClick}
                                className="text-[#5C2E1B] cursor-pointer hover:underline"
                              >
                                Click to upload
                              </button>
                            )}
                          </div>
                          <p className="text-[#667085] text-[10px] md:text-[11px] lg:text-[12px]">
                            SVG, PNG, JPG or GIF (max. 800x400px)
                          </p>
                        </div>
                        <input
                          ref={inputRef}
                          type="file"
                          accept=".png, .jpg, .jpeg, .svg, .gif"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="w-[40px] h-[40px] md:w-[64px] md:h-[64px] rounded-lg flex items-center justify-center">
                        <Image
                          src={
                            formFields.file instanceof File
                              ? URL.createObjectURL(formFields.file)
                              : (formFields.file as string)
                          }
                          width={34}
                          height={34}
                          alt="User Logo"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex items-center gap-2 md:gap-4">
                        {editProfile ? (
                          <button
                            type="button"
                            onClick={() => {
                              setEditProfile(true);
                              setFormFields((prev) => ({
                                ...prev,
                                file: null,
                              }));
                            }}
                            className="hover:text-[#5C2E1B] hover:underline cursor-pointer"
                          >
                            Cancel
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => {
                              setEditProfile(true);
                              setFormFields((prev) => ({
                                ...prev,
                                file: null,
                              }));
                            }}
                            className="hover:text-[#5C2E1B] hover:underline cursor-pointer"
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div className="w-full h-[1px] bg-[#E4E7EC]" />
              <div className="flex flex-col md:grid md:grid-cols-3 md:items-center gap-2 py-1.5 md:py-2">
                <p>Address</p>
                <div className="flex flex-col gap-1">
                  <input
                    type="text"
                    placeholder="Abuja"
                    readOnly={!editProfile ? true : false}
                    value={
                      !editProfile
                        ? businessInfo?.address ?? ""
                        : formFields.address
                    }
                    onChange={(e) =>
                      setFormFields((prev) => ({
                        ...prev,
                        address: e.target.value,
                      }))
                    }
                    className={`${
                      !editProfile ? "cursor-not-allowed" : "cursor-text"
                    } outline-0 border border-[#D0D5DD] pl-3 rounded-[8px] py-1.5 w-full md:w-[312px] lg:w-[400px]`}
                  />
                  {/* <div className="flex items-center gap-2">
                    <input type="checkbox" name="" id="" />
                    <p>I have a physical address</p>
                  </div> */}
                </div>
              </div>
              <div className="w-full h-[1px] bg-[#E4E7EC]" />
              <div className="flex flex-col md:grid md:grid-cols-3 md:items-center gap-2 py-1.5 md:py-2">
                <p>Opening hours</p>
                <OpeningHoursSelector
                  value={formFields.openingHours}
                  onChange={(data) =>
                    setFormFields((prev) => ({
                      ...prev,
                      openingHours: data,
                    }))
                  }
                  disabled={!editProfile}
                />
              </div>
              <div className="w-full h-[1px] bg-[#E4E7EC]" />
              <div className="flex flex-col md:grid md:grid-cols-3 gap-2 py-1.5 md:py-2">
                <p className="flex flex-col">
                  Short description
                  <span className="text-[#667085] text-xs md:text-[13px] lg:text-sm">
                    Briefly describe your business
                  </span>
                </p>
                <div className="flex flex-col gap-2">
                  <SelectButton
                    title="select:"
                    options={["Normal text", "Italic"]}
                  />
                  <textarea
                    name=""
                    id=""
                    cols={30}
                    rows={3}
                    placeholder="Comment"
                    readOnly={!editProfile ? true : false}
                    value={
                      !editProfile
                        ? businessInfo?.shortDesc ?? ""
                        : formFields.shortDescription
                    }
                    onChange={(e) =>
                      setFormFields((prev) => ({
                        ...prev,
                        shortDescription: e.target.value,
                      }))
                    }
                    className={`${
                      !editProfile ? "cursor-not-allowed" : "cursor-text"
                    } outline-0 placeholder:text-[#98A2B3] text-xs lg:text-sm border border-[#D0D5DD] rounded-[8px] outline-none p-4  w-full md:w-[312px] lg:w-[400px]`}
                  />
                </div>
              </div>
            </div>
            <div className="w-full h-[1px] bg-[#E4E7EC]" />
            <div
              className={`${
                editProfile ? "flex" : "hidden"
              } items-center justify-end gap-4`}
            >
              <button
                type="button"
                onClick={() => setEditProfile(false)}
                className="px-4 py-2 rounded-[8px] bg-[#F9FAFB] border border-[#D0D5DD] text-[#344054]"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isPending}
                className="px-6 py-2 rounded-[8px] bg-[#5C2E1B] text-white"
              >
                {isPending ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Profile;

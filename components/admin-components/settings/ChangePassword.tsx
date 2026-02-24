"use client";
import { useChangePassword } from "@/services/settings/settingsService";
import { changePasswordSchema } from "./settingsSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { BiHide, BiShow } from "react-icons/bi";
import { useForm } from "react-hook-form";
import React, { useState } from "react";
import { motion } from "framer-motion";

export default function ChangePassword() {
  const [showConfirmPassword, setshowConfirmPasswordword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const { mutate: changePassword, isPending } = useChangePassword();

  // React Hook Form
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(changePasswordSchema),
    mode: "onChange",
  });

  // ChangePassword Submission Handler
  const handlePasswordChange = async (data: any) => {
    const payload = {
      currentPassword: data.oldPassword,
      newPassword: data.newPassword,
    };
    changePassword({ payload });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col gap-8"
    >
      <div className="flex flex-col gap-3">
        <div className="flex flex-col pb-3">
          <p className="text-[#101828] font-semibold">Password</p>
          <p className="text-[#667085]">
            Please enter your current password to change your password.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(handlePasswordChange)}
          className="flex flex-col gap-3"
        >
          <hr className="border-[0.4px] border-[#E4E7EC]" />

          {/* Current Password */}
          <div className="flex flex-col lg:items-center lg:grid lg:grid-cols-3 py-3 text-sm lg:text-base">
            <p className="text-[#344054] font-semibold">Current password</p>
            <div className="border-[1.2px] border-[#E4E7EC] rounded-lg w-full">
              <input
                type="password"
                {...register("oldPassword")}
                className="rounded-lg py-1.5 lg:py-2 pl-3 w-full outline-none text-[#667085] placeholder:text-[#667085]"
              />
            </div>
            {errors.oldPassword && (
              <p className="text-red-500 text-xs col-span-3 mt-1">
                {errors.oldPassword.message as any}
              </p>
            )}
          </div>

          <hr className="border-[0.4px] border-[#E4E7EC]" />

          {/* ======= New Password ====== */}
          <div className="flex flex-col lg:items-center lg:grid lg:grid-cols-3 py-3 text-sm lg:text-base">
            <p className="text-[#344054] font-semibold">New password</p>
            <div className="flex flex-col w-full">
              <div className="flex items-center justify-between rounded-lg border-[1.2px] border-[#E4E7EC]">
                <input
                  type={showNewPassword ? "text" : "password"}
                  {...register("newPassword")}
                  className="py-1.5 lg:py-2 pl-3 w-full rounded-lg outline-none text-[#667085] placeholder:text-[#667085]"
                />
                {showNewPassword ? (
                  <BiShow
                    size={24}
                    onClick={() => setShowNewPassword(false)}
                    className="mr-2 cursor-pointer text-[#667085]"
                  />
                ) : (
                  <BiHide
                    size={24}
                    onClick={() => setShowNewPassword(true)}
                    className="mr-2 cursor-pointer text-[#667085]"
                  />
                )}
              </div>
              <span className="text-[#667085] text-xs mt-1">
                Your new password must be more than 8 characters.
              </span>
              {errors.newPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.newPassword.message as any}
                </p>
              )}
            </div>
          </div>

          <hr className="border-[0.4px] border-[#E4E7EC]" />

          {/* Confirm New Password */}
          <div className="flex flex-wrap items-center lg:grid lg:grid-cols-3 py-3 text-sm lg:text-base">
            <p className="text-[#344054] font-semibold">Confirm new password</p>
            <div className="flex items-center justify-between rounded-lg w-full border-[1.2px] border-[#E4E7EC]">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="*******"
                {...register("confirmNewPassword")}
                className="py-1.5 lg:py-2 pl-3 w-full rounded-lg outline-none text-[#667085] placeholder:text-[#667085]"
              />
              {showConfirmPassword ? (
                <BiShow
                  size={24}
                  onClick={() =>
                    setshowConfirmPasswordword(!showConfirmPassword)
                  }
                  className="mr-2 cursor-pointer text-[#667085]"
                />
              ) : (
                <BiHide
                  size={24}
                  onClick={() =>
                    setshowConfirmPasswordword(!showConfirmPassword)
                  }
                  className="mr-2 cursor-pointer text-[#667085]"
                />
              )}
            </div>
            {errors.confirmNewPassword && (
              <p className="text-red-500 text-xs col-span-3 mt-1">
                {errors.confirmNewPassword.message as any}
              </p>
            )}
          </div>

          <hr className="border-[0.4px] border-[#E4E7EC]" />

          {/* ======= Buttons  ======== */}
          <div className="flex items-center justify-end gap-3 mt-1 text-sm lg:text-base">
            <button
              type="button"
              className="cursor-pointer px-7 py-2 text-[#404652] border rounded-lg bg-[#F9FAFB]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || isPending}
              className="cursor-pointer p-3 rounded-lg text-white bg-[#5C2E1B] hover:bg-[#5C2E1B]/80 text-sm"
            >
              {isPending ? "Updating..." : "Update password"}
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}

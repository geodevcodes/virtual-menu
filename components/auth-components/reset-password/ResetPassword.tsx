"use client";
import { useResetPassword } from "@/services/auth/authService";
import { resetPasswordSchema } from "./resetPasswordSchema";
import { ArrowLeft, LoaderCircle } from "lucide-react";
import { yupResolver } from "@hookform/resolvers/yup";
import { ResetPasswordType } from "@/types/authType";
import { BiHide, BiShow } from "react-icons/bi";
import BrandLogo from "@/public/BrandLogo.png";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface ResetPasswordProps {
  token: string;
}

export default function ResetPassword({ token }: ResetPasswordProps) {
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { mutate: resetPassword, isPending } = useResetPassword();
  const router = useRouter();

  // REACT HOOK FORM LOGIC
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ resolver: yupResolver(resetPasswordSchema) });

  // Handle Login Form Submission LOGIC
  const onSubmitHandler = async (data: ResetPasswordType) => {
    const payload = {
      newPassword: data.password,
      token: token,
    };
    resetPassword(
      { payload },
      {
        onSuccess: () => {
          router.replace("?status=success");
        },
      },
    );
  };

  return (
    <>
      <div className="bg-[#FFFFFF] rounded-lg max-w-[350px] md:max-w-[480px] mx-auto overflow-y-scroll w-full mt-6 lg:mt-10 pt-10 pb-20 px-6 lg:px-10 lg:py-20">
        <Image
          src={BrandLogo}
          alt="Virtual Menu brand logo"
          width={100}
          height={100}
          priority
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1024px"
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPM83Q/BwAD+QHOthae+QAAAABJRU5ErkJggg=="
          className="object-cover w-[86px] h-[32px] mx-auto"
        />
        <div className="max-w-[540px] mx-auto">
          <p className="text-[24px] text-[#141414] font-bold text-center">
            Set new password
          </p>
          <p className="text-sm text-[#667085] text-center max-w-[300px] mx-auto mt-3 mb-5">
            Your new password must be different to previously used passwords.
          </p>
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            {/* =======  Password ======== */}
            <div className="mt-4 relative">
              <div>
                <label htmlFor="password" className="text-base">
                  Password
                </label>
                <input
                  type={`${showPassword ? "text" : "password"}`}
                  placeholder="Create a password"
                  {...register("password")}
                  maxLength={32}
                  className={`${
                    errors.password
                      ? "border-red-500 bg-[#FEF3F2]"
                      : "border-[#E9EDF0]"
                  } pr-12 pl-3 py-2 border-[1.3px] focus:outline-none placeholder:text-sm cursor-text flex justify-between rounded-lg w-full`}
                />
              </div>
              <span
                className="absolute cursor-pointer bottom-3 right-2 pt-4 flex items-center mr-[0.25rem] text-[#FF8447]"
                onClick={() => setShowPassword(!showPassword)}
              >
                <BiHide
                  size={18}
                  className={
                    showPassword === false
                      ? "hidden items-center cursor-pointer"
                      : "text-gray-500"
                  }
                />
                <BiShow
                  size={18}
                  className={
                    showPassword === true
                      ? "hidden items-center cursor-pointer"
                      : "text-gray-500"
                  }
                />
              </span>
            </div>
            <span className="block text-xs text-[#667085] mt-2">
              Must be at least 8 characters.
            </span>

            {/* =======  Confirm Password ======== */}
            <div className="mt-4 relative">
              <div>
                <label htmlFor="confirmPassword" className="text-base">
                  Confirm Password
                </label>
                <input
                  type={`${showConfirmPassword ? "text" : "password"}`}
                  placeholder="**********"
                  {...register("confirmPassword")}
                  maxLength={32}
                  className={`${
                    errors.confirmPassword
                      ? "border-red-500 bg-[#FEF3F2]"
                      : "border-[#E9EDF0]"
                  } pr-12 pl-3 py-2 border-[1.3px] focus:outline-none placeholder:text-sm cursor-text flex justify-between rounded-lg w-full`}
                />
              </div>
              <span
                className="absolute cursor-pointer bottom-3 right-2 pt-4 flex items-center mr-[0.25rem] text-[#FF8447]"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <BiHide
                  size={18}
                  className={
                    showConfirmPassword === false
                      ? "hidden items-center cursor-pointer"
                      : "text-gray-500"
                  }
                />
                <BiShow
                  size={18}
                  className={
                    showConfirmPassword === true
                      ? "hidden items-center cursor-pointer"
                      : "text-gray-500"
                  }
                />
              </span>
            </div>

            <button
              disabled={!isValid || isPending}
              className={`${
                !isValid || isPending
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-[#5C2E1B] text-white hover:bg-[#5C2E1B]/90 cursor-pointer"
              } px-8 py-2 flex items-center justify-center mt-8 text-[16px] rounded-lg w-full  transition duration-500 ease-in-out`}
            >
              {isPending ? (
                <span className="flex space-x-4 gap-3">
                  <LoaderCircle className="animate-spin duration-75" />
                  Resetting....
                </span>
              ) : (
                "Reset password"
              )}
            </button>
          </form>

          {/* ====== Back to Login ======  */}
          <Link
            href="/"
            className="mt-4 cursor-pointer w-fit mx-auto text-center text-[#667085] text-sm flex items-center justify-center gap-2"
          >
            <ArrowLeft className="size-4" />
            <span className="text-sm font-medium ">Back to log in</span>
          </Link>
        </div>
      </div>
    </>
  );
}

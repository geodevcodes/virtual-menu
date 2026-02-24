"use client";
import BrandLogo from "@/public/BrandLogo.png";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ResetPasswordMessage() {
  return (
    <>
      <div className="bg-[#FFFFFF] rounded-lg max-w-[350px] md:max-w-[480px] mx-auto overflow-y-scroll w-full mt-6 lg:mt-10 pt-10 pb-20 px-6 lg:px-10 lg:py-20">
        <Image
          src={BrandLogo}
          alt="clear essence brand logo"
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
            Password reset
          </p>
          <p className="text-sm text-[#667085] text-center max-w-[300px] mx-auto mt-3 mb-5">
            Your password has been successfully reset. Click below to log in.
          </p>

          <button
            type="button"
            className="bg-[#5C2E1B] text-white hover:bg-[#5C2E1B]/90 cursor-pointer px-8 py-2 flex items-center justify-center mt-8 text-[16px] rounded-lg w-full  transition duration-500 ease-in-out"
          >
            Continue
          </button>

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

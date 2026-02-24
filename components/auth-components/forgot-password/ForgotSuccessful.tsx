"use client";

import { Logo } from "@/assets";
import Loader from "@/assets/Loader";
import { useForgotPassword } from "@/services/auth/authService";
import Link from "next/link";
import { BiArrowBack } from "react-icons/bi";

type FgtSuccessProps = {
  email: string;
};

const ForgotSuccessful = ({ email }: FgtSuccessProps) => {
  const { mutate: forgotPassword, isPending } = useForgotPassword();

  const handleResend = () => {
    const payload = {
      email,
    };
    forgotPassword(payload);
  };

  return (
    <div className="py-10 lg:py-20 px-2 md:px-4 lg:px-10 flex flex-col items-center gap-6 lg:gap-8 w-full">
      <Logo className="" />

      <div className="flex flex-col items-center gap-3 md:gap-2.5 lg:gap-3">
        <h1 className="text-[#101828] lg:text-[30px] md:text-xl text-lg font-semibold tracking-wide">
          Check your email
        </h1>
        <p className="text-[#667085] text-center lg:text-base md:text-sm text-xs tracking-wide">
          We sent a password reset link to <br /> <span>{email}</span>
        </p>
      </div>

      <button
        onClick={() => (window.location.href = "https://mail.google.com")}
        className={`bg-[#5C2E1B] cursor-pointer text-white rounded-[8px] py-2.5 md:py-3 lg:py-3.5 text-sm w-full`}
      >
        Open email app
      </button>

      <div className="text-[#667085] text-sm flex items-center gap-0.5">
        Didn’t receive the email?
        {isPending ? (
          <Loader />
        ) : (
          <button
            onClick={handleResend}
            className="text-[#5C2E1B] cursor-pointer hover:underline"
          >
            Click to resend
          </button>
        )}
      </div>

      <Link
        href={"/"}
        className="text-[#667085] text-xs lg:text-sm flex items-center gap-2 hover:underline cursor-pointer"
      >
        <BiArrowBack />
        <p>Back to log in</p>
      </Link>
    </div>
  );
};

export default ForgotSuccessful;

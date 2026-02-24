"use client";

import { Logo } from "@/assets";
import { useForgotPassword } from "@/services/auth/authService";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { BiArrowBack } from "react-icons/bi";
import { forgotPasswordSchema } from "./forgotPassSchema";
import { ForgotPasswordType } from "@/types/authType";
import ForgotSuccessful from "./ForgotSuccessful";

const ForgotPassword = () => {
  const { mutate: forgotPassword, isPending } = useForgotPassword();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ resolver: yupResolver(forgotPasswordSchema) });
  const [step, setStep] = useState(1);
  const [userEmail, setUserEmail] = useState("");

  const submitHandler = async (data: ForgotPasswordType) => {
    setUserEmail(data.email);
    const payload = {
      email: data.email,
    };
    forgotPassword(payload, {
      onSuccess: () => {
        setStep(2);
      },
    });
  };

  return (
    <>
      <div className="bg-[url('/auth-bg-image.jpg')] bg-no-repeat bg-center bg-cover h-screen w-full">
        <div className="fixed inset-0 bg-black/60 flex items-start lg:items-center justify-center">
          <div className="bg-[#ffffff] md:rounded-[12px] w-full h-full md:h-auto md:w-[450px] lg:w-[540px] xl:w-[560px] md:mt-20 lg:-mt-18">
            {step === 1 && (
              <div className="py-10 lg:py-20 px-2 md:px-4 lg:px-10 flex flex-col items-center gap-6 lg:gap-8 w-full">
                <Logo className="" />

                <div className="flex flex-col items-center gap-3 md:gap-2.5 lg:gap-3">
                  <h1 className="text-[#101828] lg:text-[30px] md:text-xl text-lg font-semibold tracking-wide">
                    Forgot password?
                  </h1>
                  <p className="text-[#667085] lg:text-base md:text-sm text-xs tracking-wide">
                    No worries, we’ll send you reset instructions.
                  </p>
                </div>

                <form
                  onSubmit={handleSubmit(submitHandler)}
                  className="flex flex-col gap-5 md:gap-6 lg:gap-7 w-full px-4 md:px-6 lg:px-10"
                >
                  <div className="flex flex-col gap-1 lg:gap-1.5 text-sm">
                    <label htmlFor="email">Email</label>
                    <div>
                      <input
                        type="email"
                        {...register("email")}
                        placeholder="Enter your email"
                        className={`${
                          errors.email
                            ? "border-[#fb2c36] bg-[#FEF3F2]"
                            : "border-[#D0D5DD]"
                        } border outline-0 rounded-[8px] py-2.5 md:py-3 lg:py-3.5 w-full pl-3`}
                      />
                      {errors.email && (
                        <span className="text-red-500 text-xs lg:text-sm">
                          {errors.email.message}
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={!isValid || isPending}
                    className={`${
                      !isValid || isPending
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-[#5C2E1B]"
                    } text-white rounded-[8px] py-2.5 md:py-3 lg:py-3.5 text-sm`}
                  >
                    {isPending ? "Loading..." : "Reset password"}
                  </button>
                </form>
                <Link
                  href={"/"}
                  className="text-[#667085] text-xs lg:text-sm flex items-center gap-2 hover:underline cursor-pointer"
                >
                  <BiArrowBack />
                  <p>Back to log in</p>
                </Link>
              </div>
            )}
            {step === 2 && <ForgotSuccessful email={userEmail} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;

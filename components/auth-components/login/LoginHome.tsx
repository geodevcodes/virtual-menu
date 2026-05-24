"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import AuthService from "@/services/auth/authService";
import { BiHide, BiShow } from "react-icons/bi";
import BrandLogo from "@/public/BrandLogo.png";
import { LoginType } from "@/types/authType";
import { LoaderCircle } from "lucide-react";
import { loginSchema } from "./loginSchema";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "sonner";
import Image from "next/image";
import Link from "next/link";

export default function LoginHome() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useRouter();

  // REACT HOOK FORM LOGIC
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(loginSchema) });

  // Handle Login Form Submission LOGIC
  const onSubmitHandler = async (data: LoginType) => {
    const body = {
      ...data,
    };

    try {
      setIsLoading(true);
      const result = await AuthService.login(body);
      console.log("login result=", result);
      if (result?.statusCode === 200) {
        sessionStorage.setItem("authToken", result?.data?.accessToken);
        sessionStorage.setItem("user", JSON.stringify(result?.data?.user));
        toast.success("Login Successful");
        navigate.push("/menu");
      }
    } catch (error: any) {
      console.log(error);
      toast.error(
        error?.response?.data?.message ??
          error?.message ??
          "Error Occurred! Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Google OAuth Redirect Handler
  const handleGoogleRedirect = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/google`;
  };

  return (
    <>
      <div className="bg-[#FFFFFF] rounded-lg max-w-[350px] md:max-w-[480px] mx-auto overflow-y-scroll w-full mt-10 lg:mt-24 pt-10 pb-20 px-6 lg:px-10 lg:py-20">
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
        <div className="px- w-ful max-w-[540px] mx-auto ">
          <p className="text-[24px] text-[#141414] font-bold text-center">
            Welcome Back!
          </p>
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            {/* =======Email ===== */}
            <div className="mt-4">
              <label htmlFor="email" className="text-base">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                {...register("email")}
                maxLength={40}
                className={`${
                  errors.email
                    ? "border-red-500 bg-[#FEF3F2]"
                    : "border-[#E9EDF0]"
                } p-2 border-[1.3px] focus:outline-none placeholder:text-sm cursor-text flex justify-between rounded-lg w-full`}
              />
            </div>

            {/* =======  Password ======== */}
            <div className="mt-4 relative">
              <div>
                <label htmlFor="password" className="text-base">
                  Password
                </label>
                <input
                  type={`${showPassword ? "text" : "password"}`}
                  placeholder="Enter password"
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
            {/* ====Forget Password ===== */}
            <div className="flex justify-end text-sm text-[#3D414F] ml-4 mt-2">
              <Link
                href="/forgot-password"
                className="hover:underline block text-xs text-[#667085] font-semibold"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              disabled={isLoading}
              className={`${
                isLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
              } px-8 py-2 flex items-center justify-center mt-8 bg-[#5C2E1B] hover:bg-[#5C2E1B]/90 text-[16px] text-white rounded-lg w-full  transition duration-500 ease-in-out`}
            >
              {isLoading ? (
                <span className="flex space-x-4 gap-3">
                  <LoaderCircle className="animate-spin duration-75" />
                  Authenticating....
                </span>
              ) : (
                "Log in"
              )}
            </button>
          </form>
          <div
            onClick={handleGoogleRedirect}
            className="mt-5 py-1 rounded-lg border-[1.3px] border-[#A8A8A8] hover:bg-gray-100 flex items-center justify-center cursor-pointer text-black font-medium"
          >
            <div>
              <FcGoogle className="size-5" />
            </div>
            <p className="py-1 ml-2">Continue with Google</p>
          </div>

          {/* ====== Don't have an account ======  */}
          <div className="mt-4 text-center text-sm">
            <p>
              Don&apos;t have an account?
              <Link
                href="/signup"
                className="ml-2 font-semibold text-[#5C2E1B]"
              >
                Create an Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

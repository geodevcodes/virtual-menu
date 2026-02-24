"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export default function Redirect() {
  const router = useRouter();
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    if (token) {
      sessionStorage.setItem("authToken", token);
      router.push("/menu");
    } else {
      toast.error("Unable to verify your session");
      return router.push("/sign-up");
    }
  }, [router]);

  return (
    <div className="flex justify-center items-cente h-screen bg-[#011727]">
      <div>
        <p className="animate-pulse text-lg lg:text-2xl lg:font-semibold text-center font-medium text-[#ffffff] pt-36 px-6">
          Just a moment while we get things ready for you...
        </p>
        <p className="text-base text-[#ffffff] text-center mt-2 animate-pulse">
          Hang tight, you&apos;r almost there!
        </p>
      </div>
    </div>
  );
}

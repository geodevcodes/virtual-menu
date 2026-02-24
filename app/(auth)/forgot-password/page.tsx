import BlurredBackground from "@/assets/BlurredBackground";
import ForgotPassword from "@/components/auth-components/forgot-password/ForgotPassword";
import React from "react";

const ForgotPasswordPage = () => {
  return (
    <BlurredBackground
      src="/auth-bg-image.jpg"
      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPM83Q/BwAD+QHOthae+QAAAABJRU5ErkJggg=="
      overlay="bg-black/60"
      layoutMode="cover"
      className="h-screen text-[#344054]"
    >
      <ForgotPassword />
    </BlurredBackground>
  );
};

export default ForgotPasswordPage;

import BlurredBackground from "@/assets/BlurredBackground";
import ViewMenu from "@/components/admin-components/customers/ViewMenu";
import React from "react";

const ViewMenuPage = () => {
  return (
    <BlurredBackground
      src="/auth-bg-image.jpg"
      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPM83Q/BwAD+QHOthae+QAAAABJRU5ErkJggg=="
      overlay="bg-black/60"
      layoutMode="cover"
      className="h-screen text-[#344054]"
    >
      <ViewMenu />
    </BlurredBackground>
  );
};

export default ViewMenuPage;

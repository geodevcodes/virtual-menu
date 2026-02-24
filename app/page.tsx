import LoginHome from "@/components/auth-components/login/LoginHome";
import BlurredBackground from "@/assets/BlurredBackground";

export default async function LoginPage() {
  return (
    <BlurredBackground
      src="/auth-bg-image.jpg"
      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPM83Q/BwAD+QHOthae+QAAAABJRU5ErkJggg=="
      overlay="bg-black/60"
      layoutMode="cover"
      className="h-screen text-[#344054]"
    >
      <LoginHome />
    </BlurredBackground>
  );
}

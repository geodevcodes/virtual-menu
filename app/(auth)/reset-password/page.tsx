import ResetPasswordMessage from "@/components/auth-components/reset-password/ResetPasswordMessage";
import ResetPassword from "@/components/auth-components/reset-password/ResetPassword";
import BlurredBackground from "@/assets/BlurredBackground";
import { redirect } from "next/navigation";

export default function ResetPasswordPage({ searchParams }: any) {
  const status = searchParams?.status
  const token = searchParams?.token

  if (!token) {
    redirect("/");
  }

  return (
    <BlurredBackground
      src="/auth-bg-image.jpg"
      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPM83Q/BwAD+QHOthae+QAAAABJRU5ErkJggg=="
      overlay="bg-black/60"
      layoutMode="cover"
      className="h-screen text-[#344054]"
    >
      {status === "success" ? (
        <ResetPasswordMessage />
      ) : (
        <ResetPassword token={token} />
      )}
    </BlurredBackground>
  );
}

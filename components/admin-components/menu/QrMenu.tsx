import SelectButton from "@/components/reusable/SelectButton";
import React, { useRef, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import WhiteLogo from "@/assets/WhiteLogo";
import Image from "next/image";
import { QRCodeSVG } from "qrcode.react";
import * as htmlToImage from "html-to-image";
import { toast } from "sonner";

interface MenuData {
  name?: string;
  imageUrl?: string;
  id?: string;
  menuLocation?: string;
}

interface QRMenuProps {
  closeQR: () => void;
  menuData?: MenuData;
}

const QrMenu = ({ closeQR, menuData }: QRMenuProps) => {
  const [selectPref, setSelectPref] = useState("bg");
  const [qrBg, setQrBg] = useState("/qr-bg.png");
  const qrRef = useRef<HTMLDivElement>(null);
  const [selectedResolution, setSelectedResolution] = useState("400px (print)");
  // console.log("menu data qr=", menuData);

  const productValue = `https://staging.menu.tezzasolutions.com/view-menu?menuId=${encodeURIComponent(
    menuData?.id ?? ""
  )}`;

  const handleDownloadPng = async () => {
    if (!qrRef.current) return;

    // Map selected resolution to pixel ratio multiplier
    const resolutionMap: Record<string, number> = {
      "1200px (print)": 3,
      "800px (print)": 2,
      "400px (print)": 1,
    };

    const scale = resolutionMap[selectedResolution] || 1;

    try {
      const dataUrl = await htmlToImage.toPng(qrRef.current, {
        backgroundColor: "white",
        pixelRatio: scale, // increases actual rendering resolution
        cacheBust: true,
        skipFonts: true,
      });

      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `${
        menuData?.name || "qr-code"
      }_${selectedResolution}.png`;
      link.click();
    } catch (error) {
      console.error("Error generating image:", error);
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(productValue);
      toast.success("Link copied!");
    } catch (error) {
      console.error("Failed to copy link:", error);
      toast.error("Failed to copy link");
    }
  };

  return (
    <div className="bg-white rounded-xl w-[95vw] md:w-[80vw] lg:w-[65vw] xl:w-[68vw] 2xl:w-[72vw] text-[#101828]">
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between py-4 mt-2 px-2 md:px-5 lg:px-6">
          <p className="font-semibold">
            QR Code for <span>{menuData?.name}</span> Menu
          </p>
          <IoCloseSharp onClick={closeQR} className="cursor-pointer" />
        </div>
        <div className="w-full h-[1px] bg-[#E4E7EC]" />
        <div className="p-5 md:p-6 w-full flex flex-col lg:flex-row gap-3 justify-between">
          <div className="flex flex-col gap-3 text-xs md:text-sm lg:text-[16px]">
            <p className="text-[#101828] font-semibold">Options</p>
            <label className="flex items-center gap-2.5 relative">
              <input
                type="radio"
                name="bg"
                id="bg"
                className="opacity-0 absolute cursor-pointer"
                checked={selectPref === "bg"}
                onChange={() => setSelectPref("bg")}
              />
              <div className="rounded-full border border-[#5C2E1B]">
                <div
                  className={`${
                    selectPref === "bg" ? "bg-[#5C2E1B]" : "bg-white"
                  }  rounded-full w-1.5 h-1.5 m-0.5 cursor-pointer`}
                />
              </div>
              <p className="flex items-center gap-1">
                With image background
                {/* <span className="text-[#5C2E1B] underline cursor-pointer">
                  (change image)
                </span> */}
              </p>
            </label>
            <label className="flex items-center gap-2.5 relative">
              <input
                type="radio"
                name="transparent"
                id="transparent"
                className="opacity-0 absolute cursor-pointer"
                checked={selectPref === "transparent"}
                onChange={() => setSelectPref("transparent")}
              />
              <div className="rounded-full border border-[#5C2E1B]">
                <div
                  className={`${
                    selectPref === "transparent" ? "bg-[#5C2E1B]" : "bg-white"
                  }  rounded-full w-1.5 h-1.5 m-0.5 cursor-pointer`}
                />
              </div>
              <p>Transparent</p>
            </label>

            <div className="flex items-center gap-3">
              <p className="font-semibold">Resolution</p>
              <SelectButton
                title="select"
                options={["1200px (print)", "800px (print)", "400px (print)"]}
                onChange={(option) => setSelectedResolution(option)}
              />
            </div>

            <div className="flex flex-col gap-2">
              <button
                onClick={handleDownloadPng}
                className="bg-[#5C2E1B] cursor-pointer border border-[#7F56D9] text-white rounded-lg w-36 md:w-44 lg:w-[402px] py-1.5 lg:py-2"
              >
                Download PNG
              </button>
              <button
                onClick={handleCopyLink}
                className="bg-[#F0ECEB] cursor-pointer border border-[#F0ECEB] rounded-lg w-36 md:w-44 lg:w-[402px] py-1.5 lg:py-2"
              >
                Copy Link
              </button>
            </div>

            <p className="text-[10px] md:text-[12px] lg:text-[14px] text-[#667085] lg:w-[374px]">
              <span className="font-medium ">Tip: </span>
              Use Image for marketing/print materials; choose Transparent for
              overlays or when printing onto light backgrounds.
            </p>
          </div>

          {/* qr image section */}
          <div
            ref={qrRef}
            className={`w-full h-full rounded-md bg-cover bg-center ${
              selectPref === "transparent"
                ? "border border-[#D0D5DD] shadow"
                : ""
            }`}
            style={{
              backgroundImage: selectPref === "bg" ? `url(${qrBg})` : "none",
              backgroundColor:
                selectPref === "transparent" ? "white" : "transparent",
            }}
          >
            <div className="flex flex-col items-center gap-2 lg:gap-2.5 xl:h-[550px]">
              <WhiteLogo className="mt-4" />

              <div className="flex flex-col gap-2">
                <h2
                  className={`${
                    selectPref === "transparent"
                      ? "text-[#667085]"
                      : "text-white"
                  } font-semibold text-lg md:text-xl lg:text-2xl text-center`}
                >
                  Scan for Menu
                </h2>
              </div>

              {/* <Image
                src={"/qr.png"}
                width={500}
                height={500}
                alt="QR Code"
                className="lg:w-[400px]"
              /> */}
              <div className="xl:w-[400px] xl:h-[400px] md:w-[200px] w-[150px] p-2 bg-white rounded-md flex items-center justify-center">
                <QRCodeSVG
                  value={productValue}
                  size={500}
                  bgColor="#fff"
                  fgColor="#000"
                  className="w-fit h-fit"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QrMenu;

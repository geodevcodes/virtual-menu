"use client";

import React, { Suspense, useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Loader } from "lucide-react";
import SpaView from "./spa/SpaView";
import RestaurantView from "./restaurant/RestaurantView";
import { useGetMenu } from "@/services/menu/menuService";
import AccommodationView from "./accommodation/AccommodationView";
import ReviewLink from "./review-links/ReviewLink";

const ViewMenuContent = () => {
  const searchParams = useSearchParams();
  const menuId = searchParams.get("menuId");
  const { data, isLoading } = useGetMenu(menuId ?? "");
  // console.log("menu by id:", data);
  const menuData = data?.data;

  const [service, setService] = useState("");

  const reviewLinks = [
    menuData?.foodReviewUrl,
    menuData?.drinkReviewUrl,
    menuData?.spaReviewUrl,
    menuData?.accommodationReviewUrl,
  ].filter(Boolean);
  const menuList = [
    {
      name: "Restaurant Menu",
      file: menuData?.foodMenuFile || menuData?.drinkMenuFile,
      click: () => setService("restaurant"),
    },
    {
      name: "Spa Services",
      file: menuData?.spaMenuFile,
      click: () => setService("spa"),
    },
    {
      name: "Accommodation",
      file: menuData?.accommodationMenuFile,
      click: () => setService("accommodation"),
    },
  ].filter((menu) => menu.file);

  return (
    <>
      <div className="bg-[url('/auth-bg-image.jpg')] bg-no-repeat bg-center bg-cover min-h-screen w-full">
        <div className="fixed inset-0 bg-black/60 flex items-start justify-center overflow-y-auto">
          {service === "restaurant" ? (
            <RestaurantView
              goBack={() => setService("")}
              food={menuData?.foodMenuFile}
              drink={menuData?.drinkMenuFile}
            />
          ) : service === "spa" ? (
            <SpaView
              goBack={() => setService("")}
              spa={menuData?.spaMenuFile}
            />
          ) : service === "accommodation" ? (
            <AccommodationView
              goBack={() => setService("")}
              accommodation={menuData?.accommodationMenuFile}
            />
          ) : service === "reviews" ? (
            <ReviewLink goBack={() => setService("")} menuData={menuData} />
          ) : (
            <div className="bg-[#281A1466] border border-[#F0ECEB26] rounded-[12px] w-[95%] md:w-[450px] lg:w-[540px] xl:w-[560px] mt-24">
              <div className="py-10 md:py-12 lg:py-[50px] px-2 md:px-[20px] lg:px-[40px] flex flex-col gap-5 md:gap-6 lg:gap-8 items-center">
                <div className="flex flex-col gap-2 items-center">
                  <div className="rounded-full border-2 border-white bg-[#F0ECEB] w-fit">
                    {menuData?.logoUrl ? (
                      <Image
                        src={menuData?.logoUrl}
                        alt="Logo"
                        width={100}
                        height={100}
                        className="w-14 h-14 lg:w-16 lg:h-16 p-1 rounded-full"
                      />
                    ) : (
                      <Image
                        src={"/cutz.png"}
                        alt="Logo"
                        width={100}
                        height={100}
                        className="w-14 h-14 lg:w-16 lg:h-16 p-4"
                      />
                    )}
                  </div>
                  <div className="text-[#F0ECEB] text-center">
                    <p className="lg:text-[24px] md:text-[20px] text-[18px]">
                      Welcome to Clear Essence
                    </p>
                    <p className="lg:text-[18px] md:text-[16px] text-[14px] font-light">
                      Discover what we offer
                    </p>
                  </div>
                </div>

                {isLoading ? (
                  <div className="py-10 text-gray-500 flex items-center gap-3">
                    <Loader />
                    <p>Loading viewer...</p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4 md:gap-5 lg:gap-6 w-full text-sm md:text-base">
                    {menuList.map((menu) => (
                      <button
                        key={menu.name}
                        onClick={menu.click}
                        className="w-full rounded-[8px] bg-[#F0ECEB] p-1 cursor-pointer"
                      >
                        <div className="w-full rounded-[8px] border border-[#5C2E1B] py-1.5 md:py-2 lg:py-2.5">
                          <p className="text-[#344054]">{menu.name}</p>
                        </div>
                      </button>
                    ))}
                    {reviewLinks.length > 0 && (
                      <button
                        onClick={() => setService("reviews")}
                        className="w-full rounded-[8px] border-2 lg:border-4 border-[#F0ECEB] cursor-pointer"
                      >
                        <div className="w-full rounded-[8px] bg-[#211513] py-2 md:py-2.5 lg:py-3 flex items-center justify-center">
                          <p className="text-[#FCFCFD]">
                            Share Your Experience
                          </p>
                        </div>
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const ViewMenu = () => {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col items-center justify-center min-h-screen text-center p-6 bg-gray-50">
          <div className="w-72 h-72 md:w-96 md:h-96 mb-6 bg-gray-200 rounded-lg animate-pulse" />
          <div className="py-10 text-gray-500">
            <Loader />
            <p>Loading menu...</p>
          </div>
        </div>
      }
    >
      <ViewMenuContent />
    </Suspense>
  );
};

export default ViewMenu;

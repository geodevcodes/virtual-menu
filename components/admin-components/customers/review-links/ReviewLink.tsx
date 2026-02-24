"use client";

import { MenuProps } from "@/types/menuType";
import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

type ReviewLinksProps = {
  goBack: () => void;
  menuData?: MenuProps;
};

const ReviewLink = ({ goBack, menuData }: ReviewLinksProps) => {
  const reviewList = [
    {
      name: "Restaurant",
      url: menuData?.foodReviewUrl || menuData?.drinkReviewUrl,
    },
    { name: "Spa", url: menuData?.spaReviewUrl },
    { name: "Accommodation", url: menuData?.accomodationReviewUrl },
  ].filter((review) => review.url);

  return (
    <>
      <div className="p-2 md:p-4 lg:p-8 w-full overflow-x-hidden">
        <div className="flex flex-col gap-3 md:gap-4 w-full">
          <div className="flex items-center w-full text-[#FCFCFD]">
            <button onClick={goBack} className="cursor-pointer">
              <FaArrowLeft />
            </button>
            <h1 className="lg:text-[30px] md:text-[25px] text-xl text-center flex-1">
              Welcome to Clear Essence
            </h1>
          </div>

          <div className="bg-[#281A1466] self-center border border-[#F0ECEB26] rounded-[12px] w-[95%] md:w-[450px] lg:w-[540px] xl:w-[560px] mt-16">
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
                    Share Your Experience
                  </p>
                  <p className="lg:text-[18px] md:text-[16px] text-[14px] font-light">
                    Choose the area you want to review
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-4 md:gap-5 lg:gap-6 w-full text-sm md:text-base lg:text-[20px] font-medium">
                {reviewList.map((review) => (
                  <Link
                    key={review.name}
                    href={review.url as string}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full rounded-[8px] bg-[#F0ECEB] p-1 text-center cursor-pointer"
                  >
                    <div className="w-full rounded-[8px] border border-[#5C2E1B] py-1.5 md:py-2 lg:py-2.5">
                      <p className="text-[#344054]">{review.name}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewLink;

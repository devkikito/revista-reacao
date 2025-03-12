"use client";

import Image from "next/image";
import React from "react";

interface CarCardProps {
  categoryName: string;
  carImage: string;
  carImageAlt: string;
  carMark: string;
  carModel: string;
  onClick: () => void;
  isSelected: boolean;
}

export const CarCard = ({
  carImage,
  carImageAlt,
  categoryName,
  carMark,
  carModel,
  onClick,
  isSelected,
}: CarCardProps) => {
  return (
    <div
      onClick={onClick}
      className={`flex flex-col p-5 gap-3 justify-between w-full rounded-[1.25rem] cursor-pointer transition-all duration-300  sm:h-[30rem] ease-in-out ${
        isSelected ? "border-[.3125rem] border-rev-tipo-tecnologias" : "border"
      }`}
    >
      <div className="rounded-[.25rem] w-fit border border-rev-tipo-saude px-1">{categoryName}</div>
      <Image src={carImage} alt={carImageAlt} width={400} height={400} quality={100} className=" h-auto  mx-auto" />
      <div className="flex flex-col text-start">
        <span className="paragraph-01">{carMark}</span>
        <span className="title">{carModel}</span>
      </div>
    </div>
  );
};

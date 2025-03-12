"use client";

import { useHtmlFontSize } from "@/context/HtmlFontSizeContext";
import { fontSize } from "@/utils/fontSize";
import { VLibras } from "@/utils/vLibras";
import { IoLogoInstagram } from "react-icons/io5";
import { FaLinkedinIn, FaFacebookF, FaYoutube } from "react-icons/fa";
import React from "react";
import { LibrasButton } from "../button/LibrasButton";
import { ChangeThemeButton } from "../button/ChangeThemeButton";
import { Skeleton } from "../ui/skeleton";

export const BarTools = () => {
  const [isMounted, setIsMounted] = React.useState<boolean>(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const { setHtmlFontSize } = useHtmlFontSize();

  function openInNewTab(url: string) {
    window.open(url, "_blank");
  }

  if (!isMounted) {
    return <Skeleton className="w-full h-[2.875rem]" />;
  }
  return (
    <div className="bg-bg-marca200 fixed w-full z-50">
      <div className="flex items-center justify-between px-5 lg:px-[6.25rem] p-2 my-0 mx-auto">
        <div className="flex items-center justify-center h-[1.925rem] border border-white  px-2 rounded-md ">
          <VLibras />
          <p className="t0 text-white pr-1 max-sm:sr-only">Acessibilidade</p>

          <div className="w-[1px] h-[70%] bg-white max-sm:hidden" />
          <button
            onClick={() => fontSize.decrease(setHtmlFontSize)}
            aria-label="Diminuir tamanho da fonte"
            className="text-white t2 px-1"
          >
            <span aria-hidden="true">A-</span>
          </button>
          <button
            onClick={() => fontSize.normalize(setHtmlFontSize)}
            aria-label="Normalizar tamanho da fonte"
            className="text-white t2 px-1"
          >
            <span aria-hidden="true">aA</span>
          </button>
          <button
            onClick={() => fontSize.increase(setHtmlFontSize)}
            aria-label="Aumentar tamanho da fonte"
            className="text-white t2 px-1"
          >
            <span aria-hidden="true">A+</span>
          </button>
          <div className="w-[1px] h-[70%] bg-white" />
          <ChangeThemeButton />
          <div className="w-[1px] h-[70%] bg-white" />
          <LibrasButton />
        </div>
        <div className="flex items-center justify-center h-[1.925rem] px-2 gap-x-4">
          <div className="flex items-center justify-center h-[1.925rem] px-2 gap-x-4">
            <button onClick={() => openInNewTab("https://www.instagram.com/revistareacao/")}>
              <IoLogoInstagram className="text-lg text-white" />
            </button>
            <button onClick={() => openInNewTab("https://www.linkedin.com/company/biomob/")}>
              <FaLinkedinIn className="text-lg text-white" />
            </button>
            <button onClick={() => openInNewTab("https://www.facebook.com/revista.reacao/?locale=pt_BR")}>
              <FaFacebookF className="text-lg text-white" />
            </button>
            <button onClick={() => openInNewTab("https://www.youtube.com/@tvreacao5830")}>
              <FaYoutube className="text-lg text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

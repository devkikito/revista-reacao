"use client";

import React from "react";
import Image from "next/image";
import Header from "./Header";
import SwitchWithIcon from "../ui/switchWithIcon";
import FontSizeSlider from "../ui/FontSizeSlider";
import BarToolsSkeleton from "../ui/BarToolsSkeleton";
import { VLibrasIntegration } from "./VLibrasIntegration";
import LeitorDeAudio from "../ui/LeitorDeAudio";

export const CombinedHeader = () => {
  const [dropdownVisible, setDropdownVisible] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const sidebarRef = React.useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = React.useState<boolean>(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownVisible && dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownVisible(false);
      }
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setSidebarOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownVisible, sidebarOpen]);

  function ativarVLibras() {
    const vlibrasButton = document.querySelector('[vw-access-button="true"]') as HTMLElement;

    if (vlibrasButton) {
      vlibrasButton.click();
    }
  }

  if (!isMounted) {
    return <BarToolsSkeleton />;
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-bg-marca200 flex flex-col ">
      <div
        className="max-h-12 overflow-y-hidden relative flex justify-center md:justify-start gap-4 items-center 
        bg-text-verde-medio w-full 
      px-4 py-1 my-0 mx-auto text-var-icone-barra-acessibilidade "
      >
        <VLibrasIntegration />
        <div className="flex gap-4 text-var-icone-barra-acessibilidade items-center mr-auto">
          <div className="hidden lg:flex gap-1 items-center text-end max-h-[3.125rem] overflow-hidden">
            <span className="flex flex-col text-sm justify-end ">
              <span className="w-max text-end text-white">by</span>
            </span>
            <Image
              height={26}
              width={26}
              src={"/img/BIOMOB-BRANCA.png"}
              alt="Logo da Biomob"
              sizes="100vw"
              className="w-auto h-[1.625rem]"
            />
          </div>
          <span className="md:contents hidden font-semibold text-[1.4rem] font-montserrat text-white">
            Acessibilidade
          </span>
          <SwitchWithIcon />
          <FontSizeSlider />
          <Image
            src={"/ico/libras.svg"}
            onClick={ativarVLibras}
            alt="Ativar VLIBRAS"
            height={32}
            width={32}
            className="text-var-icone-barra-acessibilidade cursor-pointer"
          />
          <LeitorDeAudio />
        </div>
      </div>
      <Header />
    </header>
  );
};

export default CombinedHeader;

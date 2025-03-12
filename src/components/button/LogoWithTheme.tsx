"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { NextImage } from "../ui/NextImage";

export const LogoWithTheme = () => {
  const [mounted, setMounted] = React.useState(false);
  const { theme, setTheme } = useTheme();

  React.useEffect(() => {
    setMounted(true);
  }, [setMounted]);

  if (!mounted) {
    return (
      <Link href={"/"} className="flex justify-center items-center ">
        <Image
          src="/img/LOGO-ABERTALIGHT.png"
          alt="Logo da Biomob"
          sizes="100vw"
          className="w-[8.0625rem] h-auto "
          height={40}
          width={129}
        />
      </Link>
    );
  }

  return (
    <Link href={"/"} className="flex justify-center items-center ">
      {theme == "light" ? (
        <Image
          src="/img/LOGO-ABERTALIGHT.png"
          alt="Logo da Biomob"
          sizes="100vw"
          className="w-[8.0625rem] h-auto"
          height={40}
          width={129}
        />
      ) : (
        <Image
          src="/img/LOGO-ABERTALIGHT.png"
          alt="Logo da Biomob"
          sizes="100vw"
          className="w-[8.0625rem] h-auto"
          height={40}
          width={129}
        />
      )}
    </Link>
  );
};

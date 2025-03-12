"use client";

import { Actionmodal } from "@/components/modal/ActionModal";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface MiniCardPDFEditionProps {
  pdf?: string;
  title: string;
  image: string;
}

export const MiniCardPDFEdition = ({ pdf, title, image }: MiniCardPDFEditionProps) => {
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setShowModal(false);
      }
    };

    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowModal(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <div className="flex flex-col gap-[1.625rem] bg-rev-cards-cinza-100 pt-[1.625rem] pb-11 px-[2.0625rem] rounded-md ">
      <span className="text-rev-cinza-200 font-medium font-sarabun text-[1.375rem] ">{title}</span>

      <div className="w-[13.9375rem] h-[18.75rem] rounded-sm aspect-square">
        <Image
          src={image}
          alt={`capa da revista ${title}`}
          width={1920}
          height={1920}
          sizes={"1920 1920"}
          className="w-full h-full cursor-pointer"
          onClick={() => setShowModal(true)}
        />
      </div>

      <div ref={modalRef}>
        <Actionmodal
          open={showModal}
          onClose={handleCloseModal}
          button="FECHAR"
          border="bg-rev-azul-200"
          type="aviso"
          description="Você pode baixar seu PDF enquanto nosso leitor estilo livro está sendo feito especialmente para você."
          title={title}
          pdfUrl={pdf}
        />
      </div>
    </div>
  );
};

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import { TbFileTypePdf } from "react-icons/tb";
import { Button } from "../ui/button";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  date?: string;
  link?: string;
  description: string;
  border: string;
  type?: string;
  button?: string;
  pdfUrl?: string;
}

export const Actionmodal: React.FC<ModalProps> = ({ open, onClose, title, description, border, button, pdfUrl }) => {
  const [openModal, setOpenModal] = useState(open);
  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    setOpenModal(open);

    if (open) {
      modalRef.current?.focus();
    }
  }, [open]);

  const modalClass = `fixed inset-0 flex rounded-2xl items-center justify-center z-50 ${
    openModal ? "opacity-100" : "opacity-0 pointer-events-none"
  } transition-opacity duration-500 ease-in-out`;

  const handleDownloadPDF = () => {
    if (pdfUrl) {
      const link = document.createElement("a");
      link.href = pdfUrl;
      link.download = `${title}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (modalRef.current && !modalRef.current.contains(target) && !target.closest("#modal-content")) {
        onClose();
      }
    };

    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
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
    <div className={modalClass}>
      <div className="absolute w-[100vw] h-[100vh] bg-black opacity-50"></div>
      <div
        ref={modalRef as any}
        id="modal-content"
        className="rounded-lg z-10 relative max-w-[22rem] w-full flex flex-col pt-[5.75rem] pb-[4.625rem] px-4 justify-center 
        items-center text-center bg-bg-principal"
      >
        <button
          className="absolute top-0 right-0 p-4 text-base font-medium text-rev-cinza-200 cursor-pointer "
          onClick={onClose}
        >
          FECHAR
        </button>
        <div className="flex justify-center items-center p-[1.25rem]  w-[5.375rem] h-[5.375rem] rounded-full bg-rev-status-confirmacao">
          <TbFileTypePdf className="text-var-verde-300 bg-none w-full h-full" />
        </div>
        <span className="text-rev-status-confirmacao font-sarabun font-medium text-[1.375rem] pt-[1.125rem] pb-[1.625rem] ">
          {title}
        </span>
        <span className="font-sarabun text-base text-rev-cinza-200 pb-[2.25rem] w-full max-w-[16.5rem]">
          {description}
        </span>

        <div className="flex gap-4 justify-center items-center">
          <Button onClick={handleDownloadPDF}>Baixar</Button>
        </div>
      </div>
    </div>
  );
};

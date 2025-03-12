import React, { useState, useEffect, useRef, ButtonHTMLAttributes, RefAttributes } from "react";
import { Button } from "../ui/button";

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  date?: string;
  link?: string;
  description: string;
  border: string;
  type?: string;
  button?: string;
}

const AvisoModal: React.FC<ModalProps> = ({ open, onClose, title, description, border, button, type }) => {
  const [openModal, setOpenModal] = useState(open);
  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    setOpenModal(open);

    if (open) {
      modalRef.current?.focus();
    }
  }, [open]);

  const modalClass = `fixed  inset-0 flex rounded-2xl items-center justify-center z-50 ${
    openModal ? "opacity-100" : "opacity-0 pointer-events-none"
  } transition-opacity duration-500 ease-in-out`;

  return (
    <dialog className={modalClass} ref={modalRef}>
      <div className="absolute  w-[100vw] h-[100vh] bg-black opacity-50 "></div>
      <div className=" rounded-lg z-10 relative max-w-md w-full" id="modal-content">
        <div className="max-w-xs mx-auto flex flex-col items-center bg-white rounded-lg overflow-hidden shadow-lg">
          <div className={`text-center ${border} w-full  px-6 py-2`}>
            <h2 className="text-xl font-bold">{title}</h2>
          </div>

          <div className="bg-white px-6 pb-4">
            <p className="text-gray-700 text-center">{description}</p>
          </div>

          {button && (
            <Button onClick={onClose} variant="default" type={type as any} className=" w-min mb-4 rounded-full">
              {button}
            </Button>
          )}
        </div>
      </div>
    </dialog>
  );
};
export default AvisoModal;

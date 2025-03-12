import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import React from "react";
import { AdvertisinghorizontalSection } from "../sections/AdvertisingSection";
import { Button } from "@/components/ui/button"; // Certifique-se de importar o Button se ainda não estiver disponível

type AdvertisingSectionProps = {
  id?: string;
  src: string;
  alt: string;
  title?: string;
  description?: string;
  href?: string;
};

type DialogFormType = {
  title: string;
  open: boolean;
  setOpen: (open: boolean) => void; // Tipagem mais específica para setOpen
  maxWidth?: string;
  advertisings: AdvertisingSectionProps[];
};

export const DialogComponent: React.FC<DialogFormType> = ({ title, open, setOpen, maxWidth, advertisings }) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  // Função para fechar o dialog
  const closeDialog = () => {
    setOpen(false);
  };

  // Função para ir ao próximo anúncio
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % advertisings.length);
  };

  // Função para ir ao anúncio anterior
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + advertisings.length) % advertisings.length);
  };

  // Se não houver anúncios, não renderiza nada
  if (advertisings.length === 0) return null;

  return (
    <Dialog open={open} onOpenChange={closeDialog}>
      <DialogContent className={`${maxWidth} max-h-[80vh] overflow-y-auto`}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-5">
          {/* Exibição do anúncio atual */}
          <div className="flex items-center justify-center h-full">
            <AdvertisinghorizontalSection {...advertisings[currentIndex]} />
          </div>

          {/* Botões de navegação */}
          {advertisings.length > 1 && (
            <div className="flex justify-between items-center mt-4">
              <Button
                variant="outline"
                onClick={handlePrev}
                disabled={advertisings.length <= 1}
                aria-label="Anúncio anterior"
              >
                Anterior
              </Button>
              <span>
                {currentIndex + 1} de {advertisings.length}
              </span>
              <Button
                variant="outline"
                onClick={handleNext}
                disabled={advertisings.length <= 1}
                aria-label="Próximo anúncio"
              >
                Próximo
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

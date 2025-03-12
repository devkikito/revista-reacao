"use client";
import React, { createContext, useContext, useState, useCallback } from "react";

interface PaginationContextProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  totalPages: number;
  setTotalItems: (totalItems: number) => void;
  setItemsPerPage: (itemsPerPage: number) => void;
  setCurrentPage: (page: number) => void;
  goToFirstPage: () => void;
  goToLastPage: () => void;
  goToNextPage: () => void;
  goToPreviousPage: () => void;
}

const PaginationContext = createContext<PaginationContextProps | undefined>(
  undefined
);

export const PaginationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const goToFirstPage = useCallback(() => setCurrentPage(0), []);
  const goToLastPage = useCallback(
    () => setCurrentPage(totalPages - 1),
    [totalPages]
  );
  const goToNextPage = useCallback(() => {
    if (currentPage < totalPages - 1) setCurrentPage((prev) => prev + 1);
  }, [currentPage, totalPages]);

  const goToPreviousPage = useCallback(() => {
    if (currentPage > 0) setCurrentPage((prev) => prev - 1);
  }, [currentPage]);

  return (
    <PaginationContext.Provider
      value={{
        currentPage,
        totalItems,
        itemsPerPage,
        totalPages,
        setTotalItems,
        setItemsPerPage,
        setCurrentPage,
        goToFirstPage,
        goToLastPage,
        goToNextPage,
        goToPreviousPage,
      }}
    >
      {children}
    </PaginationContext.Provider>
  );
};

// Hook personalizado para usar o contexto de paginação
export const usePagination = (): PaginationContextProps => {
  const context = useContext(PaginationContext);
  if (!context) {
    throw new Error("usePagination must be used within a PaginationProvider");
  }
  return context;
};

"use client";
import React from "react";
import { usePagination } from "@/context/PaginationContext";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";
import { useScrollToTopOnChange } from "@/hooks/useScrollToTopOnChange";

const Pagination: React.FC = () => {
  const {
    currentPage,
    totalItems,
    itemsPerPage,
    totalPages,
    setItemsPerPage,
    goToFirstPage,
    goToLastPage,
    goToNextPage,
    goToPreviousPage,
  } = usePagination();
  useScrollToTopOnChange([currentPage, itemsPerPage]);

  const itemsPerPageOptions = totalItems < 10 ? [totalItems] : [10, 20, 50, 100];

  const handleItemsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(parseInt(event.target.value));
  };

  return (
    <div className="flex flex-wrap justify-center items-center p-4 gap-8 w-full">
      <div className="flex items-center">
        <span className="mr-2">Itens por página</span>
        <select
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
          className="px-2 py-1 border border-gray-200 rounded-md"
        >
          {itemsPerPageOptions.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-center">
        <span className="mr-2">
          Página {currentPage + 1} de {totalPages}
        </span>
        <button
          className="mx-1 p-2 border border-gray-200 rounded-md"
          onClick={goToFirstPage}
          disabled={currentPage === 0}
          aria-label="Go to first page"
        >
          <FaAnglesLeft />
        </button>
        <button
          className="mx-1 p-2 border border-gray-200 rounded-md"
          onClick={goToPreviousPage}
          disabled={currentPage === 0}
          aria-label="Go to previous page"
        >
          <FaAngleLeft />
        </button>
        <button
          className="mx-1 p-2 border border-gray-200 rounded-md"
          onClick={goToNextPage}
          disabled={currentPage === totalPages - 1}
          aria-label="Go to next page"
        >
          <FaAngleRight />
        </button>
        <button
          className="mx-1 p-2 border border-gray-200 rounded-md"
          onClick={goToLastPage}
          disabled={currentPage === totalPages - 1}
          aria-label="Go to last page"
        >
          <FaAnglesRight />
        </button>
      </div>
    </div>
  );
};

export default Pagination;

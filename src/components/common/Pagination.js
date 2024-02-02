import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

function Pagination({ pages, onSetCurrentPage }) {
  const [currentPage, setCurrentPage] = useState(1);

  const isPreviousDisabled = currentPage === 1;
  const isNextDisabled = currentPage >= pages.length;

  function handlePageChange(page) {
    setCurrentPage(page);
    onSetCurrentPage(page);
  }

  function handlePrevious() {
    if (currentPage > 1) {
      setCurrentPage((currentPage) => currentPage - 1);
      onSetCurrentPage((currentPage) => currentPage - 1);
    }
  }

  function handleNext() {
    if (currentPage < pages.length) {
      setCurrentPage((currentPage) => currentPage + 1);
      onSetCurrentPage((currentPage) => currentPage + 1);
    }
  }

  if (pages.length <= 1) return null;

  return (
    <div className="flex gap-2">
      <div
        className={`border border-blue-600 w-9 h-9 rounded-full flex justify-center items-center ${
          isPreviousDisabled
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-blue-600 group cursor-pointer"
        }`}
        onClick={handlePrevious}
      >
        <FontAwesomeIcon
          icon={faArrowLeft}
          className="text-blue-600 text-sm group-hover:text-white"
        />
      </div>
      {pages.map((page) => (
        <div
          key={page}
          className={`border border-blue-600 w-9 h-9 rounded-full flex justify-center items-center hover:bg-blue-600 cursor-pointer hover:text-white ${
            currentPage === page ? "bg-blue-600 text-white" : "text-blue-600"
          }`}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </div>
      ))}

      <div
        className={`border border-blue-600 w-9 h-9 rounded-full flex justify-center items-center ${
          isNextDisabled
            ? "opacity-50 cursor-not-allowed"
            : "group hover:bg-blue-600 cursor-pointer"
        }`}
        onClick={handleNext}
      >
        <FontAwesomeIcon
          icon={faArrowRight}
          className="text-blue-600 text-sm group-hover:text-white"
        />
      </div>
    </div>
  );
}

export default Pagination;

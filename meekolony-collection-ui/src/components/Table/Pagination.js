import React, { useState } from "react";
import { PageButton } from "./Button";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

const Pagination = ({ fetchData }) => {
  const [offset, setOffset] = useState(0);

  return (
    <div className="p-5 pb-20 md:pb-5 flex items-center justify-end">
      <div className="flex items-center gap-5">
        <span className="text-sm text-slate-200">
          Item {offset} - {offset + 20}
        </span>
        <nav
          className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
          aria-label="Pagination"
        >
          <PageButton onClick={() => fetchData(offset - 20, setOffset)}>
            <span className="sr-only">Previous</span>
            <HiChevronLeft
              className="h-5 w-5 text-white group-hover:text-gray-500"
              aria-hidden="true"
            />
          </PageButton>
          <PageButton onClick={() => fetchData(offset + 20, setOffset)}>
            <span className="sr-only">Next</span>
            <HiChevronRight
              className="h-5 w-5 text-white group-hover:text-gray-500"
              aria-hidden="true"
            />
          </PageButton>
        </nav>
      </div>
    </div>
  );
};

export default Pagination;

import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  getPageHref: (page: number) => string | undefined;
}

export function PaginationControls({
  currentPage,
  totalPages,
  getPageHref,
}: PaginationControlsProps) {
  // Helper to generate page numbers (with ellipsis if needed)
  const getPages = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, "ellipsis", totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(
          1,
          "ellipsis",
          totalPages - 4,
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages,
        );
      } else {
        pages.push(
          1,
          "ellipsis",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "ellipsis",
          totalPages,
        );
      }
    }
    return pages;
  };

  return (
    <Pagination>
      <PaginationContent>
        {currentPage > 1 && (
          <PaginationItem>
            {getPageHref(currentPage - 1) ? (
              <PaginationPrevious href={getPageHref(currentPage - 1)} />
            ) : (
              <span
                aria-disabled="true"
                tabIndex={-1}
                className="pointer-events-none opacity-50"
              >
                <PaginationPrevious href={undefined} />
              </span>
            )}
          </PaginationItem>
        )}
        {getPages().map((page, idx) =>
          page === "ellipsis" ? (
            <PaginationItem key={"ellipsis-" + idx}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={page}>
              {getPageHref(page as number) ? (
                <PaginationLink
                  href={getPageHref(page as number)}
                  isActive={currentPage === page}
                >
                  {page}
                </PaginationLink>
              ) : (
                <span
                  aria-disabled="true"
                  tabIndex={-1}
                  className="pointer-events-none opacity-50"
                >
                  <PaginationLink
                    href={undefined}
                    isActive={currentPage === page}
                  >
                    {page}
                  </PaginationLink>
                </span>
              )}
            </PaginationItem>
          ),
        )}
        {currentPage < totalPages && (
          <PaginationItem>
            {getPageHref(currentPage + 1) ? (
              <PaginationNext href={getPageHref(currentPage + 1)} />
            ) : (
              <span
                aria-disabled="true"
                tabIndex={-1}
                className="pointer-events-none opacity-50"
              >
                <PaginationNext href={undefined} />
              </span>
            )}
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}

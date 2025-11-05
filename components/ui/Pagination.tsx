// components/ui/Pagination.tsx
'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onNext: () => void;
  onPrev: () => void;
  className?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  onNext,
  onPrev,
  className,
}: PaginationProps) {
  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Add first page if not in range
    if (startPage > 1) {
      pages.push(
        <button
          key={1}
          onClick={() => onPageChange(1)}
          className="px-3 py-2 text-sm text-gray-700 hover:text-amber-600 hover:bg-gray-50 rounded"
        >
          1
        </button>
      );
      
      if (startPage > 2) {
        pages.push(
          <span key="ellipsis-start" className="px-2 text-gray-400">
            ...
          </span>
        );
      }
    }

    // Add page numbers
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={cn(
            "px-3 py-2 text-sm rounded transition-colors",
            i === currentPage
              ? "bg-amber-500 text-white"
              : "text-gray-700 hover:text-amber-600 hover:bg-gray-50"
          )}
        >
          {i}
        </button>
      );
    }

    // Add last page if not in range
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(
          <span key="ellipsis-end" className="px-2 text-gray-400">
            ...
          </span>
        );
      }
      
      pages.push(
        <button
          key={totalPages}
          onClick={() => onPageChange(totalPages)}
          className="px-3 py-2 text-sm text-gray-700 hover:text-amber-600 hover:bg-gray-50 rounded"
        >
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className={cn("flex items-center space-x-1 bg-white border border-gray-200 rounded-lg p-2", className)}>
      {/* Previous Button */}
      <button
        onClick={onPrev}
        disabled={currentPage === 1}
        className={cn(
          "flex items-center px-3 py-2 text-sm rounded transition-colors",
          currentPage === 1
            ? "text-gray-400 cursor-not-allowed"
            : "text-gray-700 hover:text-amber-600 hover:bg-gray-50"
        )}
      >
        <ChevronLeft className="w-4 h-4 mr-1" />
        Previous
      </button>
      
      {/* Page Numbers */}
      {renderPageNumbers()}
      
      {/* Next Button */}
      <button
        onClick={onNext}
        disabled={currentPage === totalPages}
        className={cn(
          "flex items-center px-3 py-2 text-sm rounded transition-colors",
          currentPage === totalPages
            ? "text-gray-400 cursor-not-allowed"
            : "text-gray-700 hover:text-amber-600 hover:bg-gray-50"
        )}
      >
        Next
        <ChevronRight className="w-4 h-4 ml-1" />
      </button>
    </div>
  );
}